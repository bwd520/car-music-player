const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

// 禁用默认菜单
Menu.setApplicationMenu(null);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    autoHideMenuBar: true,
    kiosk: false, // 车机模式可以设置为true
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 在开发环境下加载Vite服务器，生产环境加载构建后的HTML
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  // 注册全局快捷键，模拟车机方向盘控制
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('control-command', 'play-pause');
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('control-command', 'next');
  });

  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('control-command', 'previous');
  });

  globalShortcut.register('VolumeUp', () => {
    mainWindow.webContents.send('control-command', 'volume-up');
  });

  globalShortcut.register('VolumeDown', () => {
    mainWindow.webContents.send('control-command', 'volume-down');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

// 退出时注销快捷键
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});