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
    print("🔧 Avvio backend Flask...")
    
    # Script per avviare backend con ambiente virtuale
    backend_script = '''
source ../venv/bin/activate && cd ../demucs-backend && python app.py
'''
    
    print(f"📝 Eseguo: {backend_script}")
    
    # Avvia backend in subprocess con output visibile
    backend_process = subprocess.Popen(
        backend_script, 
        shell=True, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.STDOUT,
        universal_newlines=True
    )
    
    # Attesa che backend sia pronto
    print("⏳ Attesa avvio backend...")
    time.sleep(8)
    
    # Controlla se backend è attivo
    try:
        import requests
        response = requests.get('http://127.0.0.1:5001/health', timeout=5)
        print(f"✅ Backend attivo: {response.status_code}")
    except:
        print("❌ Backend non risponde")
        # Mostra output del backend
        output, _ = backend_process.communicate(timeout=2)
        print(f"Backend output: {output}")
    
    return backend_process

def main():
    """Funzione principale per app standalone"""
    print("🚀 Avvio Stemify Standalone...")
    
    # Avvia backend
    backend_process = start_backend()
    
    # Attesa che backend sia pronto
    time.sleep(2)
    
    # Crea finestra webview
    print("🖥️ Creazione finestra webview...")
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
