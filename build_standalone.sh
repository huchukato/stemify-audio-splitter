#!/bin/bash

# Stemify Standalone Builder
# Crea un eseguibile standalone con browser embedded

set -e

# Importa libreria centralizzata
source "$(dirname "$0")/lib.stemify.sh"

# Configurazione
BUILD_DIR="$STEMIFY_ROOT/build_standalone"
DIST_DIR="$BUILD_DIR/dist"
APP_NAME="Stemify"

# Colori
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Creazione directory build
prepare_build() {
    print_info "Preparazione ambiente build..."
    
    # Pulisci build precedente
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"
    mkdir -p "$DIST_DIR"
    
    # Attiva ambiente
    activate_venv
}

# Build frontend
build_frontend() {
    print_info "Build frontend React..."
    cd "$STEMIFY_ROOT/demucs-gui"
    npm run build
    
    # Copia build in directory standalone
    cp -r dist "$BUILD_DIR/frontend/"
    print_success "Frontend build completato"
}

# Preparazione backend standalone
prepare_backend() {
    print_info "Preparazione backend standalone..."
    
    cd "$BUILD_DIR"
    
    # Crea script backend standalone che include tutto
    cat > backend_server.py << 'EOF'
#!/usr/bin/env python3
"""
Stemify Backend Server - Modalità Standalone
Server Flask con browser embedded per app desktop
"""

import sys
import os
import subprocess
import webview
import threading
import time

def start_backend():
    """Avvia backend Flask in background usando l'ambiente virtuale"""
    # Attiva ambiente virtuale
    venv_activate = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'venv', 'bin', 'activate')
    backend_script = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'demucs-backend', 'app.py')
    
    # Script per avviare backend con ambiente virtuale
    run_script = f'''
source {venv_activate} && cd {os.path.dirname(backend_script)} && python app.py
'''
    
    # Avvia backend in subprocess
    backend_process = subprocess.Popen(run_script, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Attesa che backend sia pronto
    time.sleep(3)
    
    return backend_process

def main():
    """Funzione principale per app standalone"""
    print("🚀 Avvio Stemify Standalone...")
    
    # Avvia backend
    backend_process = start_backend()
    
    # Attesa che backend sia pronto
    time.sleep(5)
    
    # Crea finestra webview
    webview.create_window(
        'Stemify - Audio Splitter',
        'http://127.0.0.1:5001',
        width=1200,
        height=800,
        resizable=True,
        min_size=(800, 600)
    )
    
    webview.start()
    
    # Cleanup quando finestra si chiude
    if backend_process:
        backend_process.terminate()

if __name__ == '__main__':
    main()
EOF
    
    chmod +x backend_server.py
    print_success "Backend standalone preparato"
}

# Installazione dipendenze standalone
install_standalone_deps() {
    print_info "Installazione dipendenze standalone..."
    
    cd "$STEMIFY_ROOT/demucs-backend"
    uv add pywebview
    
    print_success "Dipendenze standalone installate"
}

# Creazione eseguibile
create_executable() {
    print_info "Creazione eseguibile standalone..."
    
    cd "$BUILD_DIR"
    
    # Copia file backend
    cp -r "$STEMIFY_ROOT/demucs-backend/"* .
    
    # Crea launcher
    cat > "$APP_NAME.sh" << 'EOF'
#!/bin/bash
# Stemify Standalone Launcher
STEMIFY_DIR="/Volumes/NVME/dev-ai/stemify-audio-splitter"
BUILD_DIR="\$STEMIFY_DIR/build_standalone"

cd "\$BUILD_DIR"

# Installa dipendenze se necessario
if ! command -v python3 &> /dev/null; then
    echo "❌ Python non trovato"
    exit 1
fi

# Controlla ambiente virtuale
if [[ -f "\$STEMIFY_DIR/venv/bin/activate" ]]; then
    echo "ℹ️ Attivo ambiente virtuale esistente..."
    source "\$STEMIFY_DIR/venv/bin/activate"
elif [[ -f "venv/bin/activate" ]]; then
    echo "ℹ️ Attivo ambiente virtuale esistente..."
    source "venv/bin/activate"
else
    echo "❌ Ambiente virtuale non trovato"
    exit 1
fi

# Installa dipendenze nell'ambiente virtuale
echo "ℹ️ Installazione dipendenze Flask..."
pip3 install flask flask-cors

# Installa pywebview se necessario
if ! python3 -c "import webview" 2>/dev/null; then
    echo "ℹ️ Installazione pywebview..."
    pip3 install pywebview
fi

# Avvia backend con pywebview
python3 backend_server.py
EOF
    
    chmod +x "$APP_NAME.sh"
    
    # Icona (se esiste)
    if [[ -f "$STEMIFY_ROOT/demucs-gui/public/logo.png" ]]; then
        cp "$STEMIFY_ROOT/demucs-gui/public/logo.png" "$BUILD_DIR/icon.png"
    fi
    
    print_success "Eseguibile creato"
}

# Creazione pacchetto
package_app() {
    print_info "Creazione pacchetto standalone..."
    
    cd "$BUILD_DIR"
    
    # Crea archivio
    local archive_name="${APP_NAME}-standalone-$(uname -s)-$(uname -m).tar.gz"
    tar -czf "$DIST_DIR/$archive_name" \
        backend_server.py \
        "$APP_NAME.sh" \
        icon.png \
        app.py \
        gunicorn_config.py \
        pyproject.toml \
        requirements.txt \
        static/ \
        separated/ \
        temp/ \
        frontend/
    
    print_success "Pacchetto creato: $archive_name"
}

# Funzione principale
main() {
    echo "🎵 Creazione Stemify Standalone"
    echo "================================="
    echo ""
    
    # Setup
    prepare_build
    
    # Installazione dipendenze
    install_standalone_deps
    
    # Build
    build_frontend
    prepare_backend
    create_executable
    package_app
    
    echo ""
    print_success "Build standalone completato!"
    echo ""
    print_info "Pacchetto disponibile in: $DIST_DIR"
    print_info "Per testare: cd $BUILD_DIR && ./$APP_NAME.sh"
}

# Esecuzione
main "$@"
