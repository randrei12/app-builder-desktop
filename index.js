const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');

function createWindow() {
    const win = new BrowserWindow({
        minWidth: 830,
        minHeight: 500,
        width: 880,
        height: 550,
        frame: false,
        transparent: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    if (process.env.PRODUCTION == 1) win.loadFile('dist/index.html');
    else win.loadURL('http://localhost:3000');
    win.setMenuBarVisibility(false);
    // win.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });                 
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('quitProgram', app.quit);
ipcMain.handle('fetch', async (e, args) => {
    let res = await fetch(...args);
    let { status, statusText } = res;
    let text = await res.text();
    return { status, statusText, text };
});