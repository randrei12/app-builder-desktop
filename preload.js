const { contextBridge, ipcRenderer }  = require('electron');
const fs = require('fs');
const path = require('path');

(async () => {
    let userData = await ipcRenderer.invoke('userData');

    contextBridge.exposeInMainWorld('electron', {
        quit: () => ipcRenderer.invoke('quitProgram'),
        fetch: (...args) => ipcRenderer.invoke('fetch', args),
        process: () => ipcRenderer.invoke('process'),
        path: () => ipcRenderer.invoke('path'),
        isPath: fs.existsSync,
        makePath: fs.mkdirSync,
        userData,
        path
    });
})();
