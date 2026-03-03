#!/bin/bash

# Libreria centralizzata per Stemify standalone
# Basato sull'approccio di OneTrainer

set -e

# Configurazione
STEMIFY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$STEMIFY_ROOT/venv"
PYTHON_MIN="3.12"
PYTHON_MAX="3.13"

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funzioni di logging
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Controllo Python
check_python() {
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        print_error "Python non trovato. Installa Python 3.12+ da https://python.org"
        exit 1
    fi
    
    # Controllo versione
    PYTHON_VERSION=$("$PYTHON_CMD" --version 2>&1 | grep -oE 'Python \d+\.\d+' | grep -oE '\d+\.\d+')
    if [[ $(echo "$PYTHON_VERSION" | cut -d. -f1) -lt $(echo "$PYTHON_MIN" | cut -d. -f1) ]]; then
        print_error "Versione Python $PYTHON_VERSION troppo vecchia. Richiesta $PYTHON_MIN+"
        exit 1
    fi
    
    print_success "Python $PYTHON_VERSION trovato"
}

# Controllo uv
check_uv() {
    if ! command -v uv &> /dev/null; then
        print_warning "uv non trovato. Installazione in corso..."
        curl -LsSf https://astral.sh/uv/install.sh | sh
        export PATH="$HOME/.cargo/bin:$PATH"
    fi
    
    print_success "uv trovato"
}

# Creazione ambiente virtuale
create_venv() {
    if [[ ! -d "$VENV_DIR" ]]; then
        print_info "Creazione ambiente virtuale..."
        "$PYTHON_CMD" -m venv "$VENV_DIR"
        print_success "Ambiente virtuale creato"
    else
        print_info "Ambiente virtuale esistente"
    fi
}

# Attivazione ambiente virtuale
activate_venv() {
    if [[ -f "$VENV_DIR/bin/activate" ]]; then
        source "$VENV_DIR/bin/activate"
        print_success "Ambiente virtuale attivato"
    else
        print_error "Ambiente virtuale non trovato in $VENV_DIR"
        exit 1
    fi
}

# Installazione dipendenze backend
install_backend_deps() {
    print_info "Installazione dipendenze backend..."
    cd "$STEMIFY_ROOT/demucs-backend"
    uv sync
    print_success "Dipendenze backend installate"
}

# Installazione dipendenze frontend
install_frontend_deps() {
    print_info "Installazione dipendenze frontend..."
    cd "$STEMIFY_ROOT/demucs-gui"
    npm install
    print_success "Dipendenze frontend installate"
}

# Creazione directory necessarie
create_directories() {
    print_info "Creazione directory necessarie..."
    mkdir -p "$STEMIFY_ROOT/demucs-backend/temp"
    mkdir -p "$STEMIFY_ROOT/demucs-backend/separated"
    print_success "Directory create"
}

# Setup completo
setup_stemify() {
    print_info "Setup Stemify standalone..."
    check_python
    check_uv
    create_venv
    activate_venv
    create_directories
    install_backend_deps
    install_frontend_deps
    print_success "Setup completato!"
}

# Avvio servizi
start_services() {
    print_info "Avvio servizi Stemify..."
    
    # Avvio backend
    cd "$STEMIFY_ROOT/demucs-backend"
    print_info "Avvio backend su porta 5001..."
    uv run python -m gunicorn --bind 0.0.0.0:5001 --workers 1 --timeout 120 app:app &
    BACKEND_PID=$!
    
    # Attesa backend
    print_info "Attesa avvio backend..."
    for i in {1..30}; do
        if curl -s http://localhost:5001/health > /dev/null 2>&1; then
            print_success "Backend pronto!"
            break
        fi
        sleep 1
    done
    
    # Avvio frontend
    cd "$STEMIFY_ROOT/demucs-gui"
    print_info "Avvio frontend su porta 5173..."
    npm run dev &
    FRONTEND_PID=$!
    
    print_success "Servizi avviati!"
    print_info "Backend: http://localhost:5001"
    print_info "Frontend: http://localhost:5173"
    print_info "Per terminare: Ctrl+C"
    
    # Gestione segnali
    trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT TERM
    
    # Mantieni attivo
    wait
}
