# Shrynk - Client-Side Video Compression Tool

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FFmpeg](https://img.shields.io/badge/FFmpeg-0.12-green)

Shrynk is a powerful, browser-based video compression tool that leverages WebAssembly and FFmpeg to perform efficient video compression entirely on the client side, ensuring complete privacy and eliminating the need for server uploads.

## 🚀 Features

- **Client-Side Processing**: All video compression happens in your browser using WebAssembly
- **Zero Server Upload**: Your videos never leave your device, ensuring complete privacy
- **Multiple Compression Profiles**:
  - Custom compression with quality control
  - Twitter-optimized compression
  - WhatsApp status optimization
- **Advanced Video Controls**:
  - Adjustable video quality (High/Medium/Low)
  - Custom video trimming
  - Audio removal option
  - Multiple output formats
- **Real-Time Progress**: Live compression progress tracking
- **Responsive UI**: Beautiful, modern interface built with Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Video Processing**: FFmpeg WebAssembly
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **File Handling**: React Dropzone

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shrynk.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 Usage

1. Drop or select your video file
2. Choose compression settings:
   - Select quality level (High/Medium/Low)
   - Choose output format (MP4/MKV/MOV/AVI)
   - Set trim points (optional)
   - Toggle audio removal
3. Click "Condense" to start compression
4. Download the compressed video

## ⚙️ Technical Details

### Video Processing Pipeline
- **Input Processing**:
  - Format detection
  - Codec validation
  - Metadata extraction

- **Compression Pipeline**:
  - Resolution analysis
  - Dynamic preset selection
  - Two-pass scaling with aspect ratio preservation
  - Smart bitrate allocation

- **Output Optimization**:
  - Format-specific optimizations
  - Web-optimized flag for streaming
  - Metadata preservation

### Performance Optimizations
- FFmpeg.wasm with WebAssembly for near-native performance
- Efficient memory management and buffer handling
- Dynamic thread allocation
- Resolution-based preset selection
- Optimized scaling algorithms
- Smart chunk processing for large files

## 🔒 Privacy

- All processing happens locally in the browser
- No video data is ever sent to any server
- No analytics or tracking implemented
- Complete data isolation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Improvement
- GPU acceleration support
- Parallel chunk processing
- Advanced codec support (AV1, HEVC)
- Machine learning-based quality optimization
- WebAssembly SIMD optimization
