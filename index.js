const { app, BrowserWindow, systemPreferences } = require('electron');
const path = require('path');
require('dotenv').config();

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    if (process.env.PRODUCTION == 1) win.loadFile('dist/index.html');
    else win.loadURL('http://localhost:3000');

    win.setMenuBarVisibility(false);
    win.setBackgroundColor('#56cc5b10')
    // win.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})