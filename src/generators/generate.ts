import Swal from 'sweetalert2';

import web from './builders/web/main';
import mobile from './builders/mobile/main';
import desktop from './builders/desktop/main';
import HTMLConverter from './converters/html';

interface ProjectGenerator {
    build: () => Promise<void>;
}

class ProjectGenerator {
    constructor({ platform: plat, project }: { platform: string, project: { [key: string]: any } }) {
        let platform: object;
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
            default:
                platform = {};
                break;
        }
        console.log(platform, plat);
        

        this.build = async () => {
            console.log(platform, project);
            let design;
            let blocks;
            try {
                design = JSON.parse(project.data.design);
                blocks = JSON.parse(project.data.blocks);
            } catch {
                Swal.fire({
                    title: 'Error',
                    text: 'The project couldn\'t be built',
                    icon: 'error'
                })
                return;
            }

            let html = new HTMLConverter();
            html.setTarget(design);
    
            console.log(design, blocks);
        }
    }
}

export default ProjectGenerator;