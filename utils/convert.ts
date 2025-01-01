import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FileActions, VideoInputSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import {
  customVideoCompressionCommand,
  twitterCompressionCommand,
  whatsappStatusCompressionCommand,
} from "./ffmpegCommands";

// Constants for parallel processing
const SEGMENT_DURATION = 15; // Reduced segment duration for faster processing
const MAX_WORKERS = 4; // Maximum number of parallel workers

export function getFileExtension(fileName: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }
  return "";
}

function removeFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(0, lastDotIndex);
  }
  return fileName;
}

async function getDuration(ffmpeg: FFmpeg, fileName: string): Promise<number> {
  try {
    await ffmpeg.exec(["-i", fileName]);
  } catch (error: any) {
    const output = error.message;
    const durationMatch = output.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
    if (durationMatch) {
      const [_, hours, minutes, seconds] = durationMatch;
      return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    }
  }
  return 0;
}

class WorkerPool {
  private workers: Worker[] = [];
  private queue: Array<{
    input: { name: string; data: Blob };
    output: string;
    command: string[];
    resolve: (data: Uint8Array) => void;
    reject: (error: Error) => void;
  } | null> = [];
  private activeWorkers = 0;

  constructor(private maxWorkers: number) {
    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker(new URL('./ffmpeg.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = this.handleWorkerMessage.bind(this, i);
      this.workers.push(worker);
      this.queue.push(null);
    }
  }

  private handleWorkerMessage(workerIndex: number, e: MessageEvent) {
    const { type, payload } = e.data;

    switch (type) {
      case 'complete':
        this.activeWorkers--;
        const task = this.queue[workerIndex];
        if (task) {
          task.resolve(payload.data);
          this.queue[workerIndex] = null;
        }
        this.processQueue();
        break;

      case 'error':
        this.activeWorkers--;
        const errorTask = this.queue[workerIndex];
        if (errorTask) {
          errorTask.reject(new Error(payload));
          this.queue[workerIndex] = null;
        }
        this.processQueue();
        break;
    }
  }

  private processQueue() {
    if (this.activeWorkers >= this.maxWorkers) return;

    const availableWorker = this.workers.findIndex((_, i) => !this.queue[i]);
    if (availableWorker === -1) return;

    const task = this.queue[availableWorker];
    if (!task) return;

    this.activeWorkers++;
    this.workers[availableWorker].postMessage({
      type: 'process',
      payload: {
        input: task.input,
        output: task.output,
        command: task.command
      }
    });
  }

  async processSegment(input: { name: string; data: Blob }, output: string, command: string[]): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const task = { input, output, command, resolve, reject };
      const workerIndex = this.workers.findIndex((_, i) => !this.queue[i]);
      
      if (workerIndex !== -1 && this.activeWorkers < this.maxWorkers) {
        this.queue[workerIndex] = task;
        this.processQueue();
      } else {
        this.queue.push(task);
      }
    });
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate());
  }
}

export default async function convertFile(
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: VideoInputSettings
): Promise<any> {
  const { file, fileName, fileType } = actionFile;
  const timestamp = new Date().getTime();
  const output = `${removeFileExtension(fileName)}_compressed_${timestamp}.${videoSettings.videoType}`;
  let url: string | null = null;
  let outputBlob: Blob | null = null;
  let workerPool: WorkerPool | null = null;
  
  try {
    // Write the input file for duration check
    await ffmpeg.writeFile(fileName, await fetchFile(file));
    const duration = await getDuration(ffmpeg, fileName);
    await ffmpeg.deleteFile(fileName);

    if (duration > SEGMENT_DURATION && file.size > 5 * 1024 * 1024) { // Process in parallel if video is > 5MB
      workerPool = new WorkerPool(MAX_WORKERS);
      const numSegments = Math.ceil(duration / SEGMENT_DURATION);
      const segments: Uint8Array[] = [];
      const segmentPromises: Promise<Uint8Array>[] = [];

      // Create segment processing tasks
      for (let i = 0; i < numSegments; i++) {
        const start = i * SEGMENT_DURATION;
        const segDuration = Math.min(SEGMENT_DURATION, duration - start);
        const segmentOutput = `segment_${i}.${videoSettings.videoType}`;
        
        const command = videoSettings.twitterCompressionCommand
          ? twitterCompressionCommand(fileName, segmentOutput)
          : videoSettings.whatsappStatusCompressionCommand
          ? whatsappStatusCompressionCommand(fileName, segmentOutput)
          : customVideoCompressionCommand(fileName, segmentOutput, videoSettings);

        // Add seek and duration parameters
        command.splice(2, 0, "-ss", start.toString(), "-t", segDuration.toString());
        
        const segmentPromise = workerPool.processSegment(
          { name: fileName, data: file },
          segmentOutput,
          command
        );
        
        segmentPromises.push(segmentPromise);
      }

      // Wait for all segments to complete
      segments.push(...await Promise.all(segmentPromises));

      // Concatenate segments
      const totalLength = segments.reduce((acc, segment) => acc + segment.length, 0);
      const finalData = new Uint8Array(totalLength);
      let offset = 0;
      
      for (const segment of segments) {
        finalData.set(segment, offset);
        offset += segment.length;
      }

      outputBlob = new Blob([finalData], { type: `video/${videoSettings.videoType}` });
      url = URL.createObjectURL(outputBlob);
    } else {
      // Process small files normally
      await ffmpeg.writeFile(fileName, await fetchFile(file));
      const command = videoSettings.twitterCompressionCommand
        ? twitterCompressionCommand(fileName, output)
        : videoSettings.whatsappStatusCompressionCommand
        ? whatsappStatusCompressionCommand(fileName, output)
        : customVideoCompressionCommand(fileName, output, videoSettings);

      console.log("FFmpeg command:", command.join(" "));
      await ffmpeg.exec(command);
      
      const data = await ffmpeg.readFile(output);
      // Handle FFmpeg output data properly
      let uint8Array: Uint8Array;
      if (data instanceof Uint8Array) {
        uint8Array = data;
      } else if (typeof data === 'string') {
        // Handle string data by converting to Uint8Array
        uint8Array = new TextEncoder().encode(data);
      } else {
        // Handle ArrayBuffer or ArrayBufferLike
        uint8Array = new Uint8Array(data as ArrayBufferLike);
      }
      outputBlob = new Blob([uint8Array], { type: `video/${videoSettings.videoType}` });
      url = URL.createObjectURL(outputBlob);
      
      await ffmpeg.deleteFile(fileName);
      await ffmpeg.deleteFile(output);
    }
    
    return { url, output, outputBlob };
  } catch (error) {
    console.error('Conversion error:', error);
    try {
      if (url) URL.revokeObjectURL(url);
      if (workerPool) workerPool.terminate();
      await ffmpeg.deleteFile(fileName).catch(() => {});
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    throw new Error('Video conversion failed. Please try again with different settings.');
  }
}

export const formatTime = (seconds: number): string => {
  seconds = Math.round(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "hr";
    if (minutes > 0 || remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (minutes > 0) {
    formattedTime += `${minutes.toString()} min`;
    if (remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (remainingSeconds > 0 || formattedTime === "") {
    formattedTime += `${remainingSeconds} sec`;
  }

  return formattedTime;
};
