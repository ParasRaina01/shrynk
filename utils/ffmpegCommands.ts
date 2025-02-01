import { getFileExtension } from "./convert";
import { VideoFormats, VideoInputSettings, QualityType } from "./types";
const getBaseParams = (inputWidth?: number, inputHeight?: number) => {
  const preset = inputWidth && inputHeight && (inputWidth * inputHeight) > (1280 * 720)
    ? "faster" 
    : "veryfast";
  const maxrate = "1500k";
  const bufsize = "3000k";
  
  return [
    "-preset",
    preset,
    "-tune",
    "film",
    "-movflags",
    "+faststart",
    "-profile:v",
    "high",
    "-level",
    "4.1", 
    "-pix_fmt",
    "yuv420p",
    "-maxrate",
    maxrate,
    "-bufsize",
    bufsize,
    "-threads",
    "0",
    "-q:v",
    "1"
  ];
};

// Optimized scale function that combines operations
const getOptimizedScale = (targetWidth: number) => 
  `scale='min(${targetWidth},iw)':'-2':flags=lanczos,scale=trunc(iw/2)*2:trunc(ih/2)*2:force_original_aspect_ratio=decrease`;

export const whatsappStatusCompressionCommand = (
  input: string,
  output: string
) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  ...getBaseParams(),
  "-crf",
  "32",
  "-vf",
  getOptimizedScale(480),
  "-c:a",
  "aac",
  "-b:a",
  "24k",
  "-ac",
  "1",
  "-ar",
  "22050",
  "-y",
  output,
];

export const twitterCompressionCommand = (input: string, output: string) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  ...getBaseParams(),
  "-crf",
  "30",
  "-vf",
  getOptimizedScale(720),
  "-c:a",
  "aac",
  "-b:a",
  "32k",
  "-ac",
  "1",
  "-ar",
  "22050",
  "-y",
  output,
];

export const customVideoCompressionCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
): string[] => {
  const inputType = getFileExtension(input);
  if (inputType === "mp4") {
    return getMP4toMP4Command(input, output, videoSettings);
  } else {
    switch (videoSettings.videoType) {
      case VideoFormats.MP4:
        return getMP4Command(input, output, videoSettings);
      case VideoFormats.AVI:
        return getAVICommand(input, output, videoSettings);
      case VideoFormats.MKV:
        return getMKVCommand(input, output, videoSettings);
      case VideoFormats.MOV:
        return getMOVCommand(input, output, videoSettings);
      default:
        return getMP4Command(input, output, videoSettings);
    }
  }
};

const getMP4toMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const getScale = (quality: QualityType) => {
    const width = quality === QualityType.High ? 720 : quality === QualityType.Medium ? 480 : 360;
    return getOptimizedScale(width);
  };

  const getCRF = (quality: QualityType) => {
    switch(quality) {
      case QualityType.High:
        return "28";
      case QualityType.Medium:
        return "30";
      default:
        return "32";
    }
  };

  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    ...getBaseParams(),
    "-crf",
    getCRF(videoSettings.quality),
    "-vf",
    getScale(videoSettings.quality),
    "-c:a",
    "aac",
    "-b:a",
    "32k",
    "-ac",
    "1",
    "-ar",
    "22050",
    "-y",
    output,
  ];
};

const getMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const getScale = (quality: QualityType) => {
    const width = quality === QualityType.High ? 720 : quality === QualityType.Medium ? 480 : 360;
    return `scale=w='if(gt(iw,${width}),${width},iw)':h='if(gt(ih,${width}),${width},ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`;
  };

  const getCRF = (quality: QualityType) => {
    switch(quality) {
      case QualityType.High:
        return "28";
      case QualityType.Medium:
        return "30";
      default:
        return "32";
    }
  };

  const ffmpegCommand = [
    "-ss",
    videoSettings.customStartTime.toString(),
    "-i",
    input,
    "-t",
    (videoSettings.customEndTime - videoSettings.customStartTime).toString(),
    "-c:v",
    "libx264",
    ...getBaseParams(),
    "-crf",
    getCRF(videoSettings.quality),
    "-vf",
    getScale(videoSettings.quality),
  ];

  if (!videoSettings.removeAudio) {
    ffmpegCommand.push(
      "-c:a", "aac",
      "-b:a", "32k",
      "-ac", "1",
      "-ar", "22050"
    );
  } else {
    ffmpegCommand.push("-an");
  }
  
  ffmpegCommand.push("-y", output);
  return ffmpegCommand;
};

// Helper function for other formats
const getGenericCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const getScale = (quality: QualityType) => {
    const width = quality === QualityType.High ? 720 : quality === QualityType.Medium ? 480 : 360;
    return `scale=w='if(gt(iw,${width}),${width},iw)':h='if(gt(ih,${width}),${width},ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`;
  };

  const audioOptions = videoSettings.removeAudio ? ["-an"] : [
    "-c:a", "aac",
    "-b:a", "32k",
    "-ac", "1",
    "-ar", "22050"
  ];

  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    ...getBaseParams(),
    "-crf",
    "30",
    "-vf",
    getScale(videoSettings.quality),
    ...audioOptions,
    "-y",
    output,
  ];
};

const getMOVCommand = (input: string, output: string, videoSettings: VideoInputSettings) => 
  getGenericCommand(input, output, videoSettings);

const getMKVCommand = (input: string, output: string, videoSettings: VideoInputSettings) => 
  getGenericCommand(input, output, videoSettings);

const getAVICommand = (input: string, output: string, videoSettings: VideoInputSettings) => 
  getGenericCommand(input, output, videoSettings);
