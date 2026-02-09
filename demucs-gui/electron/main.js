const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let backendProcess;
let frontendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, '../public/logo.png'),
    titleBarStyle: 'hiddenInset',
    show: false // Hide window initially
  });

  // Show loading indicator
  mainWindow.loadFile(path.join(__dirname, '../loading.html'))
    .then(() => {
      console.log('Loading page loaded successfully');
    })
    .catch(err => {
      console.error('Failed to load loading.html:', err);
    });

  // Start backend server
  startBackend();

  // Wait for backend to be ready, then load the app
  let attempts = 0;
  const maxAttempts = 10;
  
  function tryLoadApp() {
    attempts++;
    console.log(`Attempt ${attempts} to load app...`);
    
    if (isDev) {
      mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
      mainWindow.show();
    } else {
      // In production, load the built app from file
      mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
        .then(() => {
          console.log('Main app loaded successfully');
          mainWindow.show();
        })
        .catch(err => {
          console.error('Failed to load index.html:', err);
          if (attempts < maxAttempts) {
            console.log('Retrying in 2 seconds...');
            setTimeout(tryLoadApp, 2000);
          } else {
            console.log('Max attempts reached, keeping loading page');
            mainWindow.show();
          }
        });
    }
  }
  
  // Start checking after backend has time to initialize
  setTimeout(async () => {
    if (!isDev) {
      // Check if backend is ready
      for (let i = 0; i < 5; i++) {
        try {
          const ready = await checkBackendReady();
          if (ready) {
            console.log('Backend is ready!');
            break;
          }
        } catch (err) {
          console.log(`Backend check ${i + 1} failed:`, err.message);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    tryLoadApp();
  }, 3000);
}

function startFrontend() {
  const frontendPath = path.join(__dirname, '..');
  
  frontendProcess = spawn('npm', ['run', 'dev:vite'], {
    cwd: frontendPath,
    stdio: 'inherit'
  });

  frontendProcess.on('error', (error) => {
    console.error('Failed to start frontend:', error);
  });

  frontendProcess.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
  });
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

function checkBackendReady() {
  return fetch('http://localhost:5001/health')
    .then(() => true)
    .catch(() => false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (frontendProcess) {
    frontendProcess.kill();
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
  if (frontendProcess) {
    frontendProcess.kill();
  }
});
