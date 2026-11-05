const { app, BrowserWindow, ipcMain, nativeImage, shell } = require('electron');
const { ChildProcess, spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const BACKEND_URL = 'http://127.0.0.1:5001';

let backendProc = null;
let win = null;

function findIcon() {
  const candidates = [
    path.join(__dirname, '..', 'icons', 'icon.icns'),
    path.join(process.resourcesPath, 'icons', 'icon.icns'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

function pingBackend() {
  return new Promise((resolve) => {
    const req = http.get(`${BACKEND_URL}/health`, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
    req.on('error', () => resolve(false));
  });
}

function backendStatus(msg) {
  win?.webContents.send('backend-status', msg);
}

async function startBackend() {
  // Reuse an already-running backend (dev workflow, manual start.sh, or a
  // previous launch that left one behind).
  if (await pingBackend()) {
    backendStatus('Backend already running');
    return;
  }

  const binName = process.platform === 'win32' ? 'stemify-backend.exe' : 'stemify-backend';
  const bin = path.join(process.resourcesPath, binName);
  if (!fs.existsSync(bin)) {
    backendStatus(`Backend binary not found: ${bin}`);
    return;
  }

  const userData = app.getPath('userData');
  fs.mkdirSync(userData, { recursive: true });
  const logFd = fs.openSync(path.join(userData, 'stemify-backend.log'), 'a');

  backendStatus('Starting backend…');
  backendProc = spawn(bin, [], {
    env: {
      ...process.env,
      STEMIFY_HOST: '127.0.0.1',
      STEMIFY_PORT: '5001',
      // Prevents Metal/MPS crash on macOS forked processes
      OBJC_DISABLE_INITIALIZE_FORK_SAFETY: 'YES',
    },
    stdio: ['ignore', logFd, logFd],
    windowsHide: true,
  });
  backendProc.on('exit', (code) => {
    backendProc = null;
    backendStatus(`Backend exited (code ${code})`);
  });

  // Onefile binaries unpack to a temp dir first — allow up to 60s.
  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (!backendProc) {
      backendStatus('Backend failed to start — see stemify-backend.log');
      return;
    }
    if (await pingBackend()) {
      backendStatus('Backend ready');
      return;
    }
    if (i % 10 === 9) backendStatus('Still starting…');
  }
  backendStatus('Backend is taking too long — see stemify-backend.log');
}

function createWindow() {
  const iconPath = findIcon();
  const icon = iconPath ? nativeImage.createFromPath(iconPath) : undefined;
  win = new BrowserWindow({
    width: 900,
    height: 900,
    icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
    return;
  }

  // Production: splash with progress while the bundled backend boots,
  // then swap in the real UI.
  win.loadFile(path.join(__dirname, '..', 'splash.html'));
  startBackend().finally(() => {
    win?.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

async function checkForUpdates() {
  try {
    const res = await fetch('https://api.github.com/repos/huchukato/stemify-audio-splitter/releases/latest', {
      headers: { 'User-Agent': 'Stemify' },
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const rel = await res.json();
    const latest = String(rel.tag_name ?? '').replace(/^v/, '');
    const current = app.getVersion();
    const newer = (() => {
      const a = latest.split('.').map(Number);
      const b = current.split('.').map(Number);
      for (let i = 0; i < 3; i++) if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
      return false;
    })();
    if (!latest || !newer) return { upToDate: true, current, latest };
    const pick = (re) => (rel.assets ?? []).find((a) => re.test(a.name))?.browser_download_url;
    const downloadUrl =
      process.platform === 'darwin' ? pick(/\.dmg$/)
      : process.platform === 'win32' ? pick(/\.exe$/)
      : pick(/\.AppImage$/) ?? pick(/\.deb$/);
    return {
      upToDate: false, current, latest,
      releaseUrl: rel.html_url,
      downloadUrl,
      notes: String(rel.body ?? '').slice(0, 600),
    };
  } catch (e) {
    return { error: String(e) };
  }
}

ipcMain.handle('update:check', checkForUpdates);
ipcMain.on('update:open', (_e, url) => {
  if (typeof url === 'string' && url.startsWith('https://')) shell.openExternal(url);
});

app.whenReady().then(createWindow);

app.on('will-quit', () => {
  backendProc?.kill();
  backendProc = null;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
