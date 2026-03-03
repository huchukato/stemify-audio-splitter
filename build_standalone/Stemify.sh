#!/bin/bash
# Stemify Standalone Launcher

cd /Volumes/NVME/dev-ai/stemify-audio-splitter/build_standalone

echo "🚀 Avvio Stemify Standalone..."

# Usa sempre l'ambiente virtuale principale che ha tutte le dipendenze
MAIN_VENV="/Volumes/NVME/dev-ai/stemify-audio-splitter/venv"

if [[ -f "$MAIN_VENV/bin/activate" ]]; then
    echo "ℹ️ Attivo ambiente virtuale principale con tutte le dipendenze..."
    source "$MAIN_VENV/bin/activate"
else
    echo "❌ Ambiente virtuale principale non trovato in $MAIN_VENV"
    exit 1
fi

# Installa solo pywebview se necessario
if ! python3 -c "import webview" 2>/dev/null; then
    echo "ℹ️ Installazione pywebview..."
    pip3 install pywebview
fi

# Avvia backend con pywebview
python3 backend_server.py
