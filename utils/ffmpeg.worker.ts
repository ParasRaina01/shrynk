import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

async function initFFmpeg() {
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    await ffmpeg.load();
  }
  return ffmpeg;
}

// Helper function to convert FileData to Uint8Array
function convertToUint8Array(data: any): Uint8Array {
  if (data instanceof Uint8Array) {
    return data;
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer);
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  if (typeof data === 'string') {
    return new TextEncoder().encode(data);
  }
  // If none of the above, assume it's a buffer-like object
  return new Uint8Array(data);
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  try {
    switch (type) {
      case 'init':
        await initFFmpeg();
        self.postMessage({ type: 'ready' });
        break;

      case 'process':
        const instance = await initFFmpeg();
        const { input, output, command } = payload;
        
        // Write input file
        await instance.writeFile(input.name, await fetchFile(input.data));
        
        // Execute command
        await instance.exec(command);
        
        // Read output and ensure it's Uint8Array
        const data = await instance.readFile(output);
        const uint8Data = convertToUint8Array(data);
        
        // Cleanup
        await instance.deleteFile(input.name);
        await instance.deleteFile(output);
        
        // Send result back
        self.postMessage({
          type: 'complete',
          payload: {
            data: uint8Data,
            output
          }
        });
        break;

      default:
        throw new Error(`Unknown command type: ${type}`);
    }
  } catch (error: any) {
    console.error('Worker error:', error);
    self.postMessage({
      type: 'error',
      payload: {
        message: error?.message || 'Unknown error occurred',
        command: type
      }
    });
  }
}; 