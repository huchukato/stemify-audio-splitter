<p align="center">
  <img src="demucs-gui/public/logo.png" alt="Stemify - The Audio Splitter" width="300">
</p>

# Stemify - The Audio Splitter

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

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
