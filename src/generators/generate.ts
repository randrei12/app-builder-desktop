import web from './builders/web/main';
import mobile from './builders/mobile/main';
import desktop from './builders/desktop/main';

interface GenerateProject {
    
}

class GenerateProject {
    constructor({ platform: plat }: { platform: string }) {
        let platform;
        switch (plat) {
            case 'web':
                platform = web;
                break;
            case 'desktop':
                platform = desktop;
                break;
            case 'mobile':
                platform = mobile;
                break;
        }
        
    }
}

export default GenerateProject;