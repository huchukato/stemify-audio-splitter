---
license: mit
tags:
- audio
- music
- stem-separation
- demucs
- desktop-app
- audio-processing
- ai
- machine-learning
language:
- en
- it
library_name: stemify
---

# 🎵 Stemify Desktop - The Audio Splitter

## 📝 Description

Stemify Desktop is a professional desktop application for AI-powered audio stem separation. Built with Facebook Research's Demucs model, it allows users to separate audio tracks into individual components (vocals, drums, bass, other) with high accuracy.

## ✨ Features

- **🖥️ Desktop Application** - Native app for Windows, macOS, and Linux
- **🤖 AI-Powered Separation** - Uses state-of-the-art Demucs AI model
- **⚡ Real-time Processing** - Fast audio separation with progress tracking
- **🎵 Multiple Formats** - Support for MP3 files up to 20MB
- **🎨 Professional UI** - Modern interface with custom branding
- **📱 Offline Capability** - Works without internet connection
- **🔄 Drag & Drop** - Intuitive file upload interface

## 🚀 Downloads

### Windows (ARM64)
- [Stemify Setup 1.0.0.exe](https://huggingface.co/huchukato/stemify-desktop/blob/main/Stemify%20Setup%201.0.0.exe) (93.1 MB)

### macOS (Apple Silicon)
- [Stemify-1.0.0-arm64.dmg](https://huggingface.co/huchukato/stemify-desktop/blob/main/Stemify-1.0.0-arm64.dmg) (114 MB)

### Linux (ARM64)
- [Stemify-1.0.0-arm64.AppImage](https://huggingface.co/huchukato/stemify-desktop/blob/main/Stemify-1.0.0-arm64.AppImage) (121 MB)

## 🎯 How to Use

1. **Download** the appropriate file for your operating system
2. **Install** the application following your OS instructions
3. **Launch** Stemify Desktop
4. **Upload** your audio file (drag & drop or click)
5. **Wait** for AI processing
6. **Download** your separated tracks

## 🛠️ Technical Details

### Architecture
- **Frontend**: React + TypeScript + Vite
- **Backend**: Flask + Python
- **Desktop**: Electron wrapper
- **AI Model**: Facebook Research Demucs
- **Audio Processing**: Real-time stem separation

### Supported Formats
- **Input**: MP3 files up to 20MB
- **Output**: 4 stems (Vocals, Drums, Bass, Other)
- **Quality**: High-fidelity separation

### System Requirements
- **Windows**: Windows 10+ (ARM64)
- **macOS**: macOS 10.12+ (Apple Silicon)
- **Linux**: Modern Linux distribution (ARM64)
- **Memory**: 4GB RAM minimum
- **Storage**: 500MB free space

## 🧠 Model Information

Stemify uses the **Demucs v4** model from Facebook Research, specifically trained for high-quality music source separation. The model has been trained on large datasets and can separate:

- **🎤 Vocals** - Lead and backing vocals
- **🥁 Drums** - Complete drum kit
- **🎸 Bass** - Bass guitar and low-frequency elements
- **🎹 Other** - Remaining instruments (guitar, piano, synths, etc.)

## 📊 Performance

- **Processing Time**: 2-5 minutes for typical 3-5 minute tracks
- **Quality**: Professional-grade separation
- **Memory Usage**: ~2GB during processing
- **CPU Usage**: Optimized for ARM64 processors

## 🔧 Build from Source

```bash
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter/demucs-gui
npm install
npm run electron-build -- --mac --win --linux
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/huchukato/stemify-audio-splitter/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- **Facebook Research** for the Demucs model
- **Electron Team** for the desktop framework
- **React Community** for the frontend library
- **Python Audio Community** for audio processing tools

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/huchukato/stemify-audio-splitter/issues)
- **Discussions**: [Community forum](https://github.com/huchukato/stemify-audio-splitter/discussions)
- **Email**: Contact through GitHub profile

---

**Made with ❤️ by [huchukato](https://github.com/huchukato)**

*Transform your music with AI-powered stem separation!*
