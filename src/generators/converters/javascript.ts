import { javascriptGenerator } from 'blockly/javascript';

interface JSConverter {
    setTemplate: (temp: template) => void;
    convert: ({ workspace, elements }: { workspace: any, elements: [string, string][] }) => void;
}

type template = {
    nodes?: string[];
}

class JSConverter {
    constructor() {
        let template: template;

        this.setTemplate = (temp: template) => template = temp;
        this.convert = ({ workspace, elements }) => {
            let code = '';
            elements.forEach(node => {
                code += `const ${node} = document.querySelector('.${node}');\n`;
            });

            code += javascriptGenerator.workspaceToCode(workspace);
            return code;
        };
    }
}

export default JSConverter;