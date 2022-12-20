import Blockly from 'blockly';

// we will register the function that we will be using
Blockly.Extensions.register('set_elements', () => {});

const DOMBlocks = ['element_on_click', 'element_on_load'];

function updateElementsDropdown({ dropdown }) {
    Blockly.Extensions.unregister('set_elements');
    Blockly.Extensions.register('set_elements', function () {
        let elemDropdown = new Blockly.FieldDropdown(dropdown);
        this.inputList[0].removeField('ELEMENT');
        this.inputList[0].insertFieldAt(1, elemDropdown, 'ELEMENT');
    });
    
}

export { updateElementsDropdown };