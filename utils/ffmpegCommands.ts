import { getFileExtension } from "./convert";
import { VideoFormats, VideoInputSettings, QualityType } from "./types";

export const whatsappStatusCompressionCommand = (
  input: string,
  output: string
) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-crf",
  "35",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
  "-movflags",
  "+faststart",
  "-maxrate",
  "1000k",
  "-bufsize",
  "1000k",
  "-fs",
  "9M",
  output,
];

export const twitterCompressionCommand = (input: string, output: string) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-profile:v",
  "high",
  "-level:v",
  "4.2",
  "-pix_fmt",
  "yuv420p",
  "-r",
  "30",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-movflags",
  "+faststart",
  "-maxrate",
  "4M",
  "-bufsize",
  "8M",
  "-tune",
  "fastdecode",
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
        return ["-i", input, output];
    }
  }
};

const getMP4toMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const scale = videoSettings.quality === QualityType.High 
    ? "scale=-2:720" 
    : videoSettings.quality === QualityType.Medium 
      ? "scale=-2:480" 
      : "scale=-2:360";

  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-tune",
    "fastdecode",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-vf",
    scale,
    output,
  ];
};

const getMP4Command = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const scale = videoSettings.quality === QualityType.High 
    ? "scale=-2:720" 
    : videoSettings.quality === QualityType.Medium 
      ? "scale=-2:480" 
      : "scale=-2:360";

  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-profile:v",
    "high",
    "-level:v",
    "4.2",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "30",
    "-maxrate",
    "4M",
    "-bufsize",
    "8M",
    "-ss",
    videoSettings.customStartTime.toString(),
    "-to",
    videoSettings.customEndTime.toString(),
    "-crf",
    videoSettings.quality,
    "-vf",
    scale,
  ];

  if (!videoSettings.removeAudio) {
    ffmpegCommand.push("-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart");
  } else {
    ffmpegCommand.push("-an");
  }
  
  ffmpegCommand.push(output);
  return ffmpegCommand;
};

const getMOVCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const scale = videoSettings.quality === QualityType.High 
    ? "-2:720" 
    : videoSettings.quality === QualityType.Medium 
      ? "-2:480" 
      : "-2:360";

  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];
  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `scale=${scale},trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    "-movflags",
    "+faststart",
    output,
  ];
};

const getMKVCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const scale = videoSettings.quality === QualityType.High 
    ? "-2:720" 
    : videoSettings.quality === QualityType.Medium 
      ? "-2:480" 
      : "-2:360";

  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];
  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `scale=${scale},trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];
};

const getAVICommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const scale = videoSettings.quality === QualityType.High 
    ? "-2:720" 
    : videoSettings.quality === QualityType.Medium 
      ? "-2:480" 
      : "-2:360";

  const audioOptions = videoSettings.removeAudio ? ["-an"] : ["-c:a", "aac", "-b:a", "128k"];
  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "fastdecode",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `scale=${scale},trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];
};

const getFLVCommand = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const ffmpegCommand = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];

  return ffmpegCommand;
};
