const web = { 
    type: 'web',
    createFiles: async (path:string, html: 'string') => {
        //create html file
        await window.electron.createFile(window.electron.path.join(path, 'index.html'), html);
    }
};

export default web;