#!/bin/bash

echo "🚀 Creating GitHub Release for Stemify Desktop v1.0.0"

# Create release notes
cat > release_notes.md << 'EOF'
# Stemify Desktop v1.0.0

🎵 **Stemify - The Audio Splitter (Desktop App)**

A full-stack desktop application for audio track separation powered by AI.

## ✨ Features

- **Desktop Application** - Native app for Windows, macOS, and Linux
- **AI-Powered Separation** - Uses Demucs AI model to separate audio tracks
- **Real-time Processing** - Fast audio separation with progress tracking
- **Multiple Formats** - Support for MP3 files up to 20MB
- **Professional UI** - Modern interface with custom branding
- **Offline Capability** - Works without internet connection

## 📦 Downloads

### Windows
- `Stemify Setup 1.0.0.exe` - Installer for Windows (ARM64)

### macOS  
- `Stemify-1.0.0-arm64.dmg` - Disk Image for macOS (Apple Silicon)
- `Stemify-1.0.0-arm64-mac.zip` - ZIP archive for macOS

### Linux
- `Stemify-1.0.0-arm64.AppImage` - Portable AppImage for Linux (ARM64)

## 🎯 How to Use

1. Download the appropriate file for your operating system
2. Run the installer or extract the archive
3. Launch Stemify Desktop
4. Drop your audio file or click to upload
5. Wait for AI processing
6. Download your separated tracks (vocals, drums, bass, other)

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Flask + Python
- **Desktop**: Electron
- **AI Model**: Facebook Research Demucs
- **Audio Processing**: Real-time stem separation

## 📋 Requirements

- **Windows**: Windows 10 or later (ARM64)
- **macOS**: macOS 10.12 or later (Apple Silicon)
- **Linux**: Modern Linux distribution (ARM64)
- **Memory**: 4GB RAM minimum
- **Storage**: 500MB free space

---

Made with ❤️ by [huchukato](https://github.com/huchukato)
EOF

echo "📝 Release notes created!"
echo "🎯 Ready to create GitHub Release!"
echo ""
echo "Files to upload:"
echo "  - Stemify Setup 1.0.0.exe (Windows)"
echo "  - Stemify-1.0.0-arm64.dmg (macOS)"
echo "  - Stemify-1.0.0-arm64.AppImage (Linux)"
echo ""
echo "Run: gh release create v1.0.0 --title 'Stemify Desktop v1.0.0' --notes-file release_notes.md"
