const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, '../public/logo.png'),
    titleBarStyle: 'hiddenInset'
  });

  // Start backend server
  startBackend();

  // Load the app
  mainWindow.loadURL('http://localhost:5173');

  // Always open DevTools for debugging
  mainWindow.webContents.openDevTools();
}

function startBackend() {
  const backendPath = path.join(__dirname, '../../demucs-backend');
  
  backendProcess = spawn('uv', ['run', 'python', 'app.py'], {
    cwd: backendPath,
    stdio: 'inherit'
  });

  backendProcess.on('error', (error) => {
    console.error('Failed to start backend:', error);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
