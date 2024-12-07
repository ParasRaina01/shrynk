const https = require('https');
const fs = require('fs');
const path = require('path');

const FFMPEG_VERSION = '0.12.4';
const FILES = [
  'ffmpeg-core.js',
  'ffmpeg-core.wasm'
];

const FFMPEG_PATH = path.join(process.cwd(), 'public', 'ffmpeg');

if (!fs.existsSync(FFMPEG_PATH)) {
  fs.mkdirSync(FFMPEG_PATH, { recursive: true });
}

FILES.forEach(file => {
  const url = `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/umd/${file}`;
  const filePath = path.join(FFMPEG_PATH, file);

  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${file}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${file}:`, err);
    process.exit(1);
  });
}); 