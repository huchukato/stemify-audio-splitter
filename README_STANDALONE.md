# 🎵 Stemify Standalone Version

Versione standalone di Stemify con browser embedded - nessuna installazione manuale richiesta!

## 🚀 Installazione Rapida

### Download Eseguibile (Consigliato)
```bash
# Scarica l'ultima release da GitHub
wget https://github.com/huchukato/stemify-audio-splitter/releases/latest/download/Stemify-standalone-$(uname -s)-$(uname -m).tar.gz

# Estrai e avvia
tar -xzf Stemify-standalone-*.tar.gz
cd Stemify-standalone-*
./Stemify.sh
```

### Build da Sorgente
```bash
git clone https://github.com/huchukato/stemify-audio-splitter.git
cd stemify-audio-splitter
./build_standalone.sh
```

## 🎯 Utilizzo

### Modalità Standalone
```bash
# Avvia app desktop con browser integrato
./Stemify.sh
```

L'app si aprirà come una vera applicazione desktop con:
- ✅ **Browser Embedded**: Nessuna configurazione browser richiesta
- ✅ **Backend Integrato**: Server Flask avviato automaticamente
- ✅ **Interfaccia Nativa**: Finestra desktop nativa
- ✅ **Zero Configurazione**: Funziona subito

## ✨ Caratteristiche Standalone

- **Browser Embedded**: pywebview per finestra nativa
- **Backend Automatico**: Server Flask avviato in background
- **Frontend React**: UI moderna e responsive
- **Cross-Platform**: Windows, macOS, Linux
- **Single Executable**: Un solo file da eseguire
- **No Dependencies**: Python e Node.js inclusi

## 🏗️ Architettura Standalone

```
Stemify-standalone/
├── Stemify.sh              # Launcher principale
├── backend_server.py         # Backend Flask + webview
├── icon.png                # Icona app
├── demucs-backend/          # Backend completo
└── frontend/                # React build statico
```

## 🔧 Vantaggi

### vs Electron
- **Più Leggero**: Senza overhead Chromium
- **Nessuna Password**: Non richiede permessi di sistema
- **Avvio Veloce**: Bootstrap istantaneo
- **Compatibilità**: Funziona su sistemi più vecchi
- **Manutenzione**: Aggiornamenti automatici

### vs Web
- **Offline Completo**: Funziona senza internet
- **Nessuna Porta**: Non richiede porte aperte
- **Integrazione**: Si integra con il sistema operativo

## 📋 Requisiti Minimi

- **Sistema**: Windows 10+, macOS 10.12+, Linux moderno
- **RAM**: 4GB+ raccomandato
- **Spazio**: 500MB per l'app
- **Nessuna dipendenza**: Tutto incluso nell'eseguibile

## 🚨 Troubleshooting

### App non si avvia
```bash
# Controlla permessi
chmod +x Stemify.sh

# Verifica dipendenze di sistema
# Linux: sudo apt install libgl1-mesa-glx
# macOS: XQuartz per sistemi senza GUI
```

### Backend non parte
```bash
# Controlla log (se presente)
tail -f backend_server.log

# Test manuale
cd demucs-backend && python app.py
```

---

Questo approccio è ispirato a strumenti come [OneTrainer](https://github.com/Nerogar/OneTrainer) per creare un'esperienza standalone professionale e senza problemi.
