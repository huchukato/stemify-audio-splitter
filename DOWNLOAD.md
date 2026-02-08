# 🚀 Stemify Desktop - Download Instructions

## 📦 Download Links

Since GitHub has a 100MB file size limit, the desktop builds are hosted externally:

### 🪟 **Windows (ARM64)**
- **Direct Download**: [Stemify Setup 1.0.0.exe](https://github.com/huchukato/stemify-audio-splitter/releases/download/v1.0.0/Stemify%20Setup%201.0.0.exe)
- **Size**: 88.8 MB
- **Requirements**: Windows 10+ (ARM64)

### 🍎 **macOS (Apple Silicon)**
- **Direct Download**: [Stemify-1.0.0-arm64.dmg](https://github.com/huchukato/stemify-audio-splitter/releases/download/v1.0.0/Stemify-1.0.0-arm64.dmg)
- **Size**: 108.7 MB
- **Requirements**: macOS 10.12+ (Apple Silicon)

### 🐧 **Linux (ARM64)**
- **Direct Download**: [Stemify-1.0.0-arm64.AppImage](https://github.com/huchukato/stemify-audio-splitter/releases/download/v1.0.0/Stemify-1.0.0-arm64.AppImage)
- **Size**: 115.0 MB
- **Requirements**: Modern Linux (ARM64)

## 🎯 Quick Start

1. **Download** the appropriate file for your operating system
2. **Run the installer** or extract the archive
3. **Launch Stemify Desktop**
4. **Drop your audio file** or click to upload
5. **Wait for AI processing**
6. **Download your separated tracks**

## 🛠️ Build from Source

If you prefer to build from source:

```bash
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter/demucs-gui
npm install
npm run electron-build -- --mac --win --linux
```

## 🔧 Alternative Hosting Options

For future releases, consider:
- **GitHub Releases** with asset links
- **GitHub Pages** for smaller files
- **External CDN** (AWS S3, Cloudflare, etc.)
- **Git LFS** for large files

---

*Note: Current files are hosted via GitHub Releases' asset URLs which bypass the 100MB limit.*
