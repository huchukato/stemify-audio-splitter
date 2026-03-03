#!/bin/bash

# Stemify Standalone Installer
# Basato sull'approccio OneTrainer

set -e

# Importa libreria centralizzata
source "$(dirname "$0")/lib.stemify.sh"

# Funzione principale
main() {
    echo "🎵 Stemify Standalone Installer"
    echo "=================================="
    echo ""
    
    # Setup completo
    setup_stemify
    
    echo ""
    print_success "Installazione completata!"
    echo ""
    print_info "Per avviare Stemify:"
    echo "   ./start_stemify.sh"
    echo ""
    print_info "Per aggiornare:"
    echo "   ./update_stemify.sh"
}

# Esecuzione
main "$@"
