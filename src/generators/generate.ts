import Swal from 'sweetalert2';
import Blockly from 'blockly';
// @ts-ignore 
import { updateElementsDropdown } from './converters/js/dynamic';
import web from './builders/web/main';
import mobile from './builders/mobile/main';
import desktop from './builders/desktop/main';
import HTMLConverter from './converters/html';
import JSConverter from './converters/javascript';

interface ProjectGenerator {
    build: () => Promise<void>;
}

class ProjectGenerator {
    constructor({ platform: plat, project, id, os }: { platform: string, project: { [key: string]: any }, id: string, os: string }) {
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
            //parsing project data from db
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
            
            //generating html code
            Swal.fire({
                title: 'Building interfaces...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            });
            Swal.showLoading(null);
            let html = new HTMLConverter();
            html.setTarget(html.generateDropped(design));
            
            //fetching toolbox file and create blockly workspace based on it
            const { text: xml } = await window.electron.fetch(import.meta.env.VITE_SERVER_URL + '/xml', { method: 'POST' });
            const workspace = new Blockly.Workspace(new Blockly.Options({ toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }}))            
            
            // dynamically setting each DOM's based blockly blocks a custom dropdown with your elements
            updateElementsDropdown({ dropdown: blocks.elems });

            //load blocks from project data
            Blockly.serialization.workspaces.load(blocks, workspace);
            
            //generating blockly javascript code
            let js = new JSConverter();
            let jsCode = js.convert({ workspace, elements: blocks.elems });
            html.setJavaScript(jsCode);
            
            //generating html
            let htmlCode = html.convert();
            
            //creating project path
            let path = localStorage.getItem('projects_path') || window.electron.userData;
            let projectPath = window.electron.path.join(path, 'projects', id, plat);
            console.log(projectPath);
            if (!path || !window.electron.isPath(projectPath)) {
                window.electron.makePath(projectPath, { recursive: true });
                localStorage.setItem('projects_path', path);
            }

            //creating files
            Swal.update({
                title: 'Writing files...'
            });
            Swal.showLoading(null);
            platform.createFiles(projectPath, htmlCode);

            //installing dependencies if necessary
            Swal.update({
                title: 'Installing dependencies...',
            });
            Swal.showLoading(null);

            try {
                await platform.install?.(projectPath);
            } catch {
                Swal.fire({
                    title: 'Error',
                    text: "The project dependencies could not be installed",
                    icon: 'error'
                });
                return;
            }

            Swal.update({
                title: `Building project for ${plat}...`,
            });
            Swal.showLoading(null);
            try {
                await platform.build?.(projectPath, os);
            } catch (e) {
                Swal.fire({
                    title: 'Error',
                    text: "The project dependencies could not be built",
                    icon: 'error'
                });
                console.log(e);
                
                return;
            }

            window.electron.beep();
            window.electron.showItemInFolder(projectPath);
            Swal.close();
        }
    }
}

export default ProjectGenerator;