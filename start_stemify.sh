#!/bin/bash

# Stemify Launcher
# Avvia tutti i servizi necessari

set -e

# Importa libreria centralizzata
source "$(dirname "$0")/lib.stemify.sh"

# Funzione principale
main() {
    echo "🚀 Avvio Stemify..."
    echo "==================="
    echo ""
    
    # Verifica setup
    if [[ ! -d "$VENV_DIR" ]]; then
        print_error "Setup non trovato. Esegui prima: ./install_stemify.sh"
        exit 1
    fi
    
    # Avvia servizi
    start_services
}

# Esecuzione
main "$@"
