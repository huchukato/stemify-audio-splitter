<p align="center">
  <img src="demucs-gui/public/logo.png" alt="Stemify - The Audio Splitter" width="300">
</p>

# Stemify - The Audio Splitter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com)
[![AI](https://img.shields.io/badge/AI-Demucs%20v4-purple.svg)](https://github.com/facebookresearch/demucs)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)]()

A web application for audio track separation. This application allows you to upload an audio file and separate it into its components: vocals, drums, bass, and other instruments.

## 🚀 Features

- Intuitive web interface
- Real-time track separation using AI
- Audio preview of separated tracks
- Download individual tracks
- Support for various audio formats
- Fast processing with Demucs v4

## 📋 Prerequisites

- Python 3.12 or higher
- uv (Python package manager) - install it with: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- npm (Node Package Manager)
- Git

## 💻 Installation

### Quick Installation for Linux and macOS

1. Clone the repository:
```bash
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Run the installation script:
```bash
chmod +x linux_mac_install_run.sh
./linux_mac_install_run.sh
```

3. Open your browser and navigate to `http://localhost:5173`

### Manual Installation

1. **Backend Setup:**
```bash
cd demucs-backend
uv sync
mkdir -p temp separated
uv run python -m gunicorn --bind 0.0.0.0:5001 --workers 1 --timeout 120 app:app
```

2. **Frontend Setup** (in another terminal):
```bash
cd demucs-gui
npm install
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🎵 How to Use

1. Upload an audio file (MP3, WAV, FLAC, etc.)
2. Wait for the AI to process and separate the tracks
3. Preview each separated track
4. Download the individual tracks you want

## 🛠️ Technology Stack

- **Backend:** Flask + Demucs v4
- **Frontend:** React + Vite + Tailwind CSS
- **Audio Processing:** Facebook's Demucs v4 model
- **Package Management:** uv (Python), npm (Node.js)

### Windows Installation

1. Clone the repository:
```powershell
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Run the installation script:
```powershell
.\win_install_run.bat
```

3. Open your browser and navigate to `http://localhost:5173`

## 🎵 How to Use

1. Upload an audio file (MP3, WAV, FLAC, etc.)
2. Wait for the AI to process and separate the tracks
3. Preview each separated track
4. Download the individual tracks you want

## 🔧 Troubleshooting

- **Backend not starting:** Make sure port 5001 is not in use
- **Frontend not loading:** Check that npm installed successfully
- **Audio processing fails:** Ensure the audio file is under 20MB

## �️ Security

This project maintains a strong security posture with regular vulnerability assessments and prompt patching.

### **Recent Security Fixes:**
- ✅ **March 2026**: Complete security audit resolution
  - Fixed all 15+ vulnerabilities via npm audit
  - Updated rollup (CVE-2026-27606), tar (CVE-2026-26960), minimatch (CVE-2026-27903)
  - Resolved all HIGH and MODERATE severity alerts
  - **Status**: 0 vulnerabilities (npm audit)

### **Security Practices:**
- 🔍 **Regular Audits**: Automated Dependabot monitoring
- 🚀 **Prompt Updates**: Security patches applied immediately
- 📋 **Vulnerability Disclosure**: Transparent security reporting
- 🔒 **Secure Dependencies**: All packages kept up-to-date

## �📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Author

- **huchukato**
  - 🐙 [GitHub](https://github.com/huchukato)
  - 🐦 [X (Twitter)](https://twitter.com/huchukato)
  - 🎨 [Civitai](https://civitai.com/user/huchukato) - Check out my AI art models!

## 🙏 Acknowledgments

- [Facebook Research](https://github.com/facebookresearch/demucs) for the Demucs v4 model
- The open-source community for the amazing tools and libraries used in this project
