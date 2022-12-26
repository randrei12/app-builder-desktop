import electronTemplate from './file_templates/electron';
import npmPackageTemplate from './file_templates/package';

const desktop = {
    createFiles: (path: string, html: string) => {
        //create html file
        window.electron.createFile(window.electron.path.join(path, 'index.html'), html);
        window.electron.createFile(window.electron.path.join(path, 'index.js'), electronTemplate({}));        
        window.electron.createFile(window.electron.path.join(path, 'package.json'), npmPackageTemplate({}));
    },

    install: async (path: string) => {
        await window.electron.run.npmInstall(path); 
    },

    build: async (path: string, platform: string) => {
        await window.electron.run.npmRun(path, platform);
    }

};

export default desktop;