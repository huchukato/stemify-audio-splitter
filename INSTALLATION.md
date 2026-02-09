# 🚀 Stemify Desktop - Installation Guide

## 📦 Installation Instructions

### Windows
1. Download `Stemify-1.0.0-win-universal.zip`
2. Extract the ZIP file
3. Run `Stemify Setup 1.0.0.exe`
4. Follow the installation wizard
5. Launch Stemify from Start Menu

### macOS
⚠️ **Important**: macOS may block unsigned apps. Use the fix tool:

#### Method 1: Automatic Fix (Recommended)
```bash
# Download and run the fix script
curl -fsSL https://raw.githubusercontent.com/huchukato/stemify-audio-splitter/main/fix_mac_app.sh -o fix_mac_app.sh
chmod +x fix_mac_app.sh
./fix_mac_app.sh
```

#### Method 2: Manual Fix
```bash
# Find your app (usually in /Applications/)
sudo xattr -rd com.apple.quarantine "/Applications/Stemify.app"
sudo xattr -cr "/Applications/Stemify.app"
```

#### Method 3: System Preferences
1. Try to open the app
2. Go to **System Preferences > Security & Privacy > General**
3. Click **"Open Anyway"** next to Stemify
4. Click **"Open"** in the confirmation dialog

### Linux
1. Download the appropriate AppImage (x64 or ARM64)
2. Make it executable: `chmod +x Stemify-1.0.0.AppImage`
3. Run the AppImage: `./Stemify-1.0.0.AppImage`

## 🔧 Troubleshooting

### macOS Issues
- **"Cannot be opened because the developer cannot be verified"**: Use the fix script above
- **App crashes on startup**: Check Console.app for error logs
- **Slow loading**: The app needs 3-5 seconds to initialize the AI backend

### Windows Issues
- **Windows Defender warning**: Click "More info" then "Run anyway"
- **Missing dependencies**: The installer includes all required components

### Linux Issues
- **Permission denied**: Use `chmod +x` on the AppImage
- **Missing libraries**: Install `libfuse2` on modern Linux distributions

## 🎯 First Run

1. **Launch the app** - You'll see a loading screen
2. **Wait 3-5 seconds** - The AI backend is initializing
3. **Ready to use!** - Upload your first audio file

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/huchukato/stemify-audio-splitter/issues)
- **Discussions**: [Community forum](https://github.com/huchukato/stemify-audio-splitter/discussions)

---

**Note**: The app may take 3-5 seconds to start as it initializes the AI audio processing backend. This is normal!
