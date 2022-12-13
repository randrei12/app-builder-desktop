const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
let win;

//dev
const log = require('electron-log');
const { session } = require('electron');


function createWindow({ route = '' }) {
    win = new BrowserWindow({
        minWidth: 830,
        minHeight: 500,
        width: 880,
        height: 550,
        frame: false,
        transparent: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    if (process.env.VITE_PRODUCTION == 1) win.loadFile(`dist/index.html/${route}`);
    else { 
        win.loadURL(`http://localhost:3000/${route}`);
        win.openDevTools();
        win.setSize(1200, 550)
    }
    win.setMenuBarVisibility(false);
}


//registering protocol so the program will be able to launch from a website
if (process.defaultApp) {
    if (process.argv.length >= 2)
        app.setAsDefaultProtocolClient('builder', process.execPath, [path.resolve(process.argv[1])]);
} else app.setAsDefaultProtocolClient('builder');


if (!app.requestSingleInstanceLock()) {
    app.quit()
} else {
    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    })
    
    app.whenReady().then(() => {
        // session.web.enableNetworkEmulation({
        //     offline: true,
        //   });
        let route;
        if (process.argv[2] && process.argv[2].startsWith('builder://')) {
            route = process.argv[2].replace('builder:///', '').replace('builder://', '');
        }

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow({ route });
            }
        });

        createWindow({ route });
        win.webContents.session.enableNetworkEmulation({ offline: true })
    });
}

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
ipcMain.handle('userData', () => app.getPath('userData'));
ipcMain.handle('path', () => path);