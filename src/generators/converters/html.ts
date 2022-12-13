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

// function droppedToElem(elem: any) {
//     let html = elem.getElement();
//     let clone = html.cloneNode();
//     clone.setAttribute('src', html.getAttribute('src') || '');
//     if (!['screen', 'div'].includes(elem.type)) clone.innerText = html.innerText;
//     clone.setAttribute('class', elem.id);
//     elem.children.get().forEach((child: any) => clone.append(droppedToElem(child)));
//     return clone;
// }

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