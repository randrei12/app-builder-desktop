import html_template from "../templates/html";
import { specialTypes } from './html/types';

interface HTMLConverter {
    setTarget: (param: any) => void;
    setJavaScript: (code: any) => void;
    convert: () => void;
    generateDropped: ({ childs, id, name, styles, type, text, src }: { childs: object[]; id: string; name: string; styles: { [key: string]: { [key: string]: string } }; type: string; text?: string; src?: string }) => HTMLElement;
}

interface customHTML extends HTMLElement {
    src: string;
}

class HTMLConverter {
    constructor() {
        let target: any;
        let javascript = '';

        this.setTarget = param => target = param;
        this.convert = () => {
            let code = html_template + target.outerHTML + javascript;
            return code;
        }

        this.generateDropped = ({ childs, id, name, styles, type, text, src }) => {
            let element: customHTML = document.createElement(specialTypes[type as keyof object] || type);
            element.classList.add(id);
            Object.keys(styles).forEach(style => element.style[style as keyof object] = styles[style as keyof object].value);
            if (text) element.innerText = text;
            if (src) element.src = src;
            childs.forEach((child: any) => element.appendChild(this.generateDropped(child)));
            return element;
        }

        this.setJavaScript = code => javascript = `<script type="module">${code}</script>`;
    }
}

export default HTMLConverter;