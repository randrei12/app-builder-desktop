const { contextBridge, ipcRenderer }  = require('electron');

contextBridge.exposeInMainWorld('electron', {
    quit: () => ipcRenderer.invoke('quitProgram'),
    fetch: (...args) => ipcRenderer.invoke('fetch', args),
    process: () => ipcRenderer.invoke('process')
});