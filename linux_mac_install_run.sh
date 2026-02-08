#!/bin/bash

echo "🚀 Inizializzazione dell'applicazione Stemify - The Audio Splitter..."

# Verifica e installazione dei prerequisiti
if ! command -v uv >/dev/null 2>&1; then
    echo "📦 Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
    echo "✅ uv installed successfully!"
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm è richiesto ma non è installato. Installalo da https://nodejs.org"
    exit 1
fi

# Configurazione del backend con uv
echo "🐍 Configurazione del backend..."
cd demucs-backend

# Installazione delle dipendenze del backend con uv
echo "📦 Installazione dipendenze Python con uv..."
uv sync

# Creazione delle cartelle necessarie
mkdir -p temp separated

# Configurazione e avvio del frontend
echo "⚛️ Configurazione del frontend..."
cd ../demucs-gui
echo "📦 Installazione dipendenze npm..."
npm install

# Avvio dei servizi
echo "🎯 Avvio dei servizi..."

# Avvio del backend con Gunicorn
cd ../demucs-backend
uv run gunicorn --bind 0.0.0.0:5001 --workers 1 --timeout 120 app:app &
BACKEND_PID=$!
disown $BACKEND_PID 2>/dev/null

# Attesa che il backend sia pronto
echo "⏳ Attesa avvio backend..."
for i in {1..30}; do
    if curl -s http://localhost:5001/health > /dev/null 2>&1; then
        echo "✅ Backend pronto!"
        break
    fi
    sleep 1
done

# Avvio del frontend
cd ../demucs-gui
npm run dev &
FRONTEND_PID=$!

echo "✨ Applicazione avviata!"
echo "📝 Backend running on http://localhost:5001"
echo "🌐 Frontend running on http://localhost:5173"
echo "Per terminare l'applicazione, premi CTRL+C"

# Gestione della chiusura pulita
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT TERM

# Mantiene lo script in esecuzione
wait 