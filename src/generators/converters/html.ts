import html_template from "../templates/html";
import { specialTypes } from './html/types';

interface HTMLConverter {
    setTarget: (param: any) => void;
    setJavaScript: (code: any) => void;
    convert: () => void;
    generateDropped: ({ childs, id, name, styles, type, text }: { childs: object[]; id: string; name: string; styles: object; type: string; text: string; }) => HTMLElement;
}

function droppedToElem(elem: any) {
    let html = elem.getElement();
    let clone = html.cloneNode();
    clone.setAttribute('src', html.getAttribute('src') || '');
    if (!['screen', 'div'].includes(elem.type)) clone.innerText = html.innerText;
    clone.setAttribute('class', elem.id);
    elem.children.get().forEach((child: any) => clone.append(droppedToElem(child)));
    return clone;
}

class HTMLConverter {
    constructor() {
        let target: any;
        let javascript = '';

        this.setTarget = param => target = param;
        this.convert = () => {
            const data = droppedToElem(target);
            let code = html_template + data.outerHTML + javascript;
            return code;    
        }

        this.generateDropped = ({ childs, id, name, styles, type, text }) => {
            let element: HTMLElement = document.createElement(specialTypes[type as keyof object] || type);
            if (text) element.innerText = text;
            return element;
        }

        this.setJavaScript = code => javascript = `<script type="module">${code}</script>`;
    }
}

export default HTMLConverter;