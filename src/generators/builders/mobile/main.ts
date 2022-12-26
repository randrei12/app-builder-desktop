import capacitorTemplate from './file_templates/capacitor';
import npmPackageTemplate from './file_templates/package';
import viteTemplate from './file_templates/vite';

const mobile = {
    createFiles: (path: string, html: string) => {
        const srcPath = window.electron.path.join(path, 'src');

        window.electron.createFile(window.electron.path.join(path, 'capacitor.config.json'), capacitorTemplate({}));        
        window.electron.createFile(window.electron.path.join(path, 'package.json'), npmPackageTemplate({}));
        window.electron.createFile(window.electron.path.join(path, 'vite.config.js'), viteTemplate());
        if (!window.electron.isPath(srcPath)) window.electron.makePath(srcPath);
        window.electron.createFile(window.electron.path.join(srcPath, 'index.html'), html);
    },

    install: async (path: string) => {
        await window.electron.run.npmInstall(path); 
    },

    build: async (path: string, platform: string) => {
        let platformPath = window.electron.path.join(path, platform);
        await window.electron.run.npmRun(path, 'start');
        //build apk code here
        if (!window.electron.isPath(platformPath)) await window.electron.run.npxCap(path, ['add', platform]);
        await window.electron.run.npxCap(path, ['sync']);
        if (platform === 'android') await window.electron.run.nativeAndroid(path, platformPath);
        else return; // ios implementation, currently not supported

    },
};

export default mobile;