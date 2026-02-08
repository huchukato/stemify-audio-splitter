<p align="center">
  <img src="logo.svg" alt="Stemify - The Audio Splitter" width="300">
</p>

# Stemify - The Audio Splitter

A full-stack web application for audio track separation. This application allows you to upload an audio file and separate it into its components: vocals, drums, bass, and other instruments.

## 🚀 Features

- Intuitive web interface
- Real-time track separation
- Audio preview of separated tracks
- Download individual tracks
- Support for various audio formats

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

3. The script will automatically install uv and open your browser at:
```
http://localhost:5173
```

### Windows Installation

#### Option 1: Quick Installation (Recommended)

1. Clone the repository:
```powershell
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Run the installation script:
```powershell
.\win_install_run.bat
```

3. The script will automatically install uv and open your browser at:
```
http://localhost:5173
```

#### Option 2: Manual Installation

1. Clone the repository:
```powershell
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Install uv (Python package manager):
```powershell
# Using PowerShell
irm https://astral.sh/uv/install.ps1 | iex
```

3. Install and run backend:
```powershell
cd demucs-backend
uv sync
uv run python app.py
```

4. In a new terminal, install and run frontend:
```powershell
cd demucs-gui
npm install
npm run dev
```

5. Open your browser and go to:
```
http://localhost:5173
```

#### Option 3: Using WSL (Windows Subsystem for Linux)

If you have WSL installed, you can use the Linux installation script:

1. Open WSL terminal
2. Follow the Linux installation steps above

### Manual Installation (For all operating systems)

If you prefer to install manually or need more control:

#### Backend
```bash
cd demucs-backend
uv sync
uv run gunicorn -c gunicorn_config.py app:app  # On Windows: uv run python app.py
```

#### Frontend
```bash
cd demucs-gui
npm install
npm run dev
```

## 🏗 Project Structure

```
demucs-gui/
├── demucs-backend/     # Flask server
│   ├── app.py         # Backend entry point
│   └── requirements.txt
├── demucs-gui/        # React client
│   ├── src/          # Frontend source code
│   └── package.json
├── linux_mac_install_run.sh # Linux/macOS installation script
└── win_install_run.bat # Windows installation script
```

## 🔧 Technologies Used

- **Backend**: 
  - Flask (Python)
  - Gunicorn
  - Demucs

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)

## 👥 Authors

- huchukato 
  - 🐙 [GitHub](https://github.com/huchukato)
  - 🐦 [X (Twitter)](https://twitter.com/huchukato)
  - 🎨 [Civitai](https://civitai.com/user/huchukato) - Check out my AI art models!

## 🙏 Acknowledgments

- [Facebook Research](https://github.com/facebookresearch/demucs) for Demucs
