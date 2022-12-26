const web = {
    createFiles: async (path:string, html: 'string') => {
        //create html file
        window.electron.createFile(window.electron.path.join(path, 'index.html'), html);
    }
};

export default web;