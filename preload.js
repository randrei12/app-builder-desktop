const { contextBridge, ipcRenderer, shell }  = require('electron');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const { platform } = require('os');

const run = {
    npmInstall: async (path) => {
        return await new Promise((resolve, reject) => {
            exec(`npm install`, { cwd: path }, (err, stdout, stderr) => {
                if (err) reject(err);
                else resolve(stdout);
            });
        });
    },

    npmRun: async (path, command) => {
        return await new Promise((resolve, reject) => {
            exec(`npm run ${command}`, { cwd: path }, (err, stdout, stderr) => {
                if (err) reject(err);
                else resolve(stdout);
            });
        });
    },

    npxCap: async (path, commands) => {
        return await new Promise((resolve, reject) => {
            exec(`npx cap ${commands.join(' ')}`, { cwd: path }, (err, stdout, stderr) => {
                if (err) reject(err);
                else resolve(stdout);
            });
        });
    },

    nativeAndroid: async (projectPath, androidPath) => {
        await new Promise((resolve, reject) => {
            exec(`${platform() !== 'win32' ? './' : ''}gradlew assembleDebug`, { cwd: androidPath }, (err, stdout, stderr) => {
                if (err) reject(err);
                else resolve(stdout);
            });
        });
        let distFolder = path.join(projectPath, 'dist');
        if (!fs.existsSync(distFolder)) fs.mkdirSync(distFolder, { recursive: true });
        fs.renameSync(path.join(androidPath, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'), path.join(distFolder, 'app.apk'));
    }
};

(async () => {
    let userData = await ipcRenderer.invoke('userData');

    contextBridge.exposeInMainWorld('electron', {
        quit: () => ipcRenderer.invoke('quitProgram'),
        fetch: (...args) => ipcRenderer.invoke('fetch', args),
        isPath: fs.existsSync,
        makePath: fs.mkdirSync,
        createFile: fs.writeFileSync,
        beep: shell.beep,
        openPath: shell.openPath,
        showItemInFolder: shell.showItemInFolder,
        userData,
        path,
        run
    });
})();
