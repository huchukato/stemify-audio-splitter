# Stemify - The Audio Splitter

Un'applicazione web full stack per la separazione delle tracce audio. Questa applicazione permette di caricare un file audio e separarlo nelle sue componenti: voce, batteria, basso e altri strumenti.

## 🚀 Caratteristiche

- Interfaccia web intuitiva
- Separazione delle tracce in tempo reale
- Anteprima audio delle tracce separate
- Download delle singole tracce
- Supporto per vari formati audio

## 📋 Prerequisiti

- Python 3.12 o superiore
- uv (Python package manager) - installalo con: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- npm (Node Package Manager)
- Git

## 💻 Installazione

### Installazione Rapida per Linux e macOS

1. Clona il repository:
```bash
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Esegui lo script di installazione:
```bash
chmod +x linux_mac_install_run.sh
./linux_mac_install_run.sh
```

3. Apri il browser e vai a:
```
http://localhost:5173
```

### Installazione Manuale

#### Backend
```bash
cd demucs-backend
uv sync
mkdir -p temp separated
uv run python -m gunicorn --bind 0.0.0.0:5001 --workers 1 --timeout 120 app:app
```

#### Frontend
```bash
cd demucs-gui
npm install
npm run dev
```

### Installazione Windows

1. Clona il repository:
```powershell
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
```

2. Esegui lo script di installazione:
```powershell
.\win_install_run.bat
```

3. Apri il browser e vai a `http://localhost:5173`

## 🏗 Struttura del Progetto

```
demucs-backend/     # Server Flask
├── app.py         # Entry point del backend
├── pyproject.toml
└── temp/          # Cartella temporanea upload
demucs-gui/        # Client React
├── src/          # Codice sorgente frontend
├── public/       # File statici (logo, etc.)
└── package.json
linux_mac_install_run.sh  # Script installazione Linux/macOS
win_install_run.bat       # Script installazione Windows
```

## 🔧 Tecnologie Utilizzate

- **Backend**: 
  - Flask (Python)
  - Gunicorn
  - Demucs

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

## 🤝 Contribuire

Le pull request sono benvenute. Per modifiche importanti, apri prima un issue per discutere cosa vorresti cambiare.

## 📝 Licenza

[MIT](https://choosealicense.com/licenses/mit/)

## 👥 Autori

- huchukato 
  - 🐙 [GitHub](https://github.com/huchukato)
  - 🐦 [X (Twitter)](https://twitter.com/huchukato)
  - 🎨 [Civitai](https://civitai.com/user/huchukato) - Check out my AI art models!

## 🙏 Ringraziamenti

- [Facebook Research](https://github.com/facebookresearch/demucs) per Demucs
