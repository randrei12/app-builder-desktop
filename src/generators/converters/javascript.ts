interface JSConverter {
    setTemplate: (temp: template) => void;
    convert: ({js, workspace}: { workspace: any, js: any }) => void;
}

type template = {
    nodes?: string[];
}

class JSConverter {
    constructor() {
        let template: template;

        this.setTemplate = (temp: template) => template = temp
        this.convert = ({js, workspace}) => {
            let code = '';
            template.nodes.forEach(node => {
                code += `const ${node} = document.querySelector('.${node}');\n`;
            });

            code += js.workspaceToCode(workspace);
            return code;
        };
    }
}

export default JSConverter;