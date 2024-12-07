// ffmpeg-setup.ts
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;

  async load() {
    if (this.ffmpeg) return;

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
    this.ffmpeg = new FFmpeg();
    
    try {
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
      this.cleanup();
      throw new Error('Failed to load FFmpeg');
    }
  }

  cleanup() {
    if (this.ffmpeg) {
      this.ffmpeg.terminate();
      this.ffmpeg = null;
    }
  }

  getInstance() {
    return this.ffmpeg;
  }
}

// Create and export a singleton instance
export const ffmpegService = new FFmpegService();