export default function electronTemplate({ menu }: { menu?: object }) {
    return (`
        const { app, BrowserWindow } = require('electron');
        const path = require('path');
        
        function createWindow() {
            const win = new BrowserWindow({
                movable: true,
                webPreferences: {
                    nodeIntegration: true,
                    /*preload: path.join(__dirname, 'preload.js')*/
                }
            });
            win.loadFile('index.html');
            ${menu || 'win.setMenuBarVisibility(false);'}
        }
        
        app.whenReady().then(() => {
            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow();
                }
            });
        
            createWindow();
        });
        
        
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    `).replaceAll(/  |\n+/g, ''); //remove all double-whitespace and newline
} 
