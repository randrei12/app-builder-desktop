import Swal from 'sweetalert2';
import Blockly from 'blockly';
console.log(Blockly);

import web from './builders/web/main';
import mobile from './builders/mobile/main';
import desktop from './builders/desktop/main';
import HTMLConverter from './converters/html';
import JSConverter from './converters/javascript';

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
            Swal.fire({
                title: 'Building interfaces...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(null);
                }
            });
            let html = new HTMLConverter();
            html.setTarget(html.generateDropped(design));
            let htmlCode = html.convert();

            //fetching toolbox file
            const { text: xml } = await window.electron.fetch(import.meta.env.VITE_SERVER_URL + '/xml', { method: 'POST' });
            
            const workspace = new Blockly.WorkspaceSvg(new Blockly.Options({ toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }}))
            Blockly.serialization.workspaces.load(blocks, workspace);

            let js = new JSConverter();
            let jsCode = js.convert({ workspace, elements: blocks.elements });
            console.log(jsCode);
            
            

            //creating project path
            let path = localStorage.getItem('projects_path') || window.electron.userData;
            let projectPath = window.electron.path.join(path, 'projects', id);
            console.log(projectPath);
            if (!path || !window.electron.isPath(projectPath)) {
                window.electron.makePath(projectPath, { recursive: true });
                localStorage.setItem('projects_path', path);
            }

            //creating files
            Swal.fire({
                title: 'Writing files...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(null);
                }
            });
            platform.createFiles(projectPath, htmlCode);

            Swal.close();
        }
    }
}

export default ProjectGenerator;