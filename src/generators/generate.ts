import Swal from 'sweetalert2';

import web from './builders/web/main';
import mobile from './builders/mobile/main';
import desktop from './builders/desktop/main';
import HTMLConverter from './converters/html';

interface ProjectGenerator {
    build: () => Promise<void>;
}

class ProjectGenerator {
    constructor({ platform: plat, project, id }: { platform: string, project: { [key: string]: any }, id: string }) {
        let platform: { [key: string]: any };
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
                    text: "The project couldn't be built",
                    icon: 'error'
                })
                return;
            }

            console.log(blocks);

            //generating html code
            let html = new HTMLConverter();
            html.setTarget(html.generateDropped(design));
            let htmlCode = html.convert();

            //creating project path
            let path = localStorage.getItem('projects_path') || window.electron.userData;
            let projectPath = window.electron.path.join(path, 'projects', id);
            console.log(path, projectPath);
            if (!path || !window.electron.isPath(projectPath)) {
                window.electron.makePath(projectPath, { recursive: true });
                localStorage.setItem('projects_path', path);
            }

            //creating files
            platform.createFiles(projectPath, htmlCode);
            
            
    
            console.log(design, blocks);
            console.log(htmlCode);
            
        }
    }
}

export default ProjectGenerator;