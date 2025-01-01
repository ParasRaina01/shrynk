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
        
        // Read output
        const data = await instance.readFile(output);
        
        // Cleanup
        await instance.deleteFile(input.name);
        await instance.deleteFile(output);
        
        // Send result back
        self.postMessage({
          type: 'complete',
          payload: {
            data: new Uint8Array(data as ArrayBuffer),
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