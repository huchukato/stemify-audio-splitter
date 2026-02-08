# Stemify Desktop App

Questa guida ti permette di convertire la web app Stemify in un'applicazione desktop utilizzando Electron.

## 🚀 Installazione

1. Installa le dipendenze Electron:
```bash
cd demucs-gui
npm install --save-dev electron electron-builder concurrently wait-on
```

2. Unisci i package.json:
```bash
cat package-electron.json >> package.json
```

## 🎯 Esecuzione

### Sviluppo
```bash
npm run electron-dev
```

### Produzione
```bash
npm run build
npm run electron-build
```

## 📦 Build per Distribuzione

### Windows
```bash
npm run electron-build -- --win
```

### macOS
```bash
npm run electron-build -- --mac
```

### Linux
```bash
npm run electron-build -- --linux
```

## 📁 Struttura

```
demucs-gui/
├── electron/
│   └── main.js          # Processo principale Electron
├── dist/                # Build del frontend
├── public/              # Asset statici
└── package-electron.json # Configurazione Electron
```

## ✨ Caratteristiche

- **Auto-start backend**: L'app avvia automaticamente il server Flask
- **Icona personalizzata**: Usa il logo Stemify
- **Cross-platform**: Windows, macOS, Linux
- **Dimensioni ottimizzate**: Finestra 1200x800px
- **Development tools**: DevTools in modalità sviluppo
