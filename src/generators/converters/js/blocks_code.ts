import { javascriptGenerator } from 'blockly/javascript';

const generateError = (text: any) => `throw new Error('${text}')`;

Object.assign(javascriptGenerator, {
    // console log (to be removed on production)
    text_print: (block: any) => {
        // Print statement.
        const msg = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_NONE) || "''";
        return 'console.log(' + msg + ');\n';
    },
    
    go_to: (block: any) => {
        const operator = block.getFieldValue('LOCATION');
        const text = javascriptGenerator.valueToCode(block, "LOCATION", javascriptGenerator.ORDER_NONE);
        return text ? `location = ${text} + '.html'` : generateError('"GO TO" value is invalid');
    },
    
    set_timeout: (block: any) => {
        const seconds = javascriptGenerator.valueToCode(block, "TIME", javascriptGenerator.ORDER_NONE);
        let code = javascriptGenerator.statementToCode(block, 'CODE');
        return seconds ? `setTimeout(() => ${code}, ${seconds * 1000})` : generateError('"AFTER X SECONDS DO" value is invalid');
    },
    
    set_interval: (block: any) => {
        const seconds = javascriptGenerator.valueToCode(block, "TIME", javascriptGenerator.ORDER_NONE);
        let code = javascriptGenerator.statementToCode(block, 'CODE');
        return seconds ? `setInterval(() => ${code}, ${seconds * 1000})` : generateError('"EACH X SECONDS DO" value is invalid');
    },
    
    test_true_false: (block: any) => {
        var value_logic = javascriptGenerator.valueToCode(block, 'LOGIC', javascriptGenerator.ORDER_ATOMIC);
        var value_true = javascriptGenerator.valueToCode(block, 'TRUE', javascriptGenerator.ORDER_ATOMIC);
        var value_false = javascriptGenerator.valueToCode(block, 'FALSE', javascriptGenerator.ORDER_ATOMIC);
        return `${value_logic} ? ${value_true} : ${value_false}`;
        // console.log({value_logic, value_true, value_false});
    },
    
    foreach: (block: any) => {
        var variable_element = javascriptGenerator.nameDB_.getName(block.getFieldValue('ELEMENT'), 'VARIABLE');
        var value_list = javascriptGenerator.valueToCode(block, 'LIST', javascriptGenerator.ORDER_ATOMIC);
        var statements_do = javascriptGenerator.statementToCode(block, 'DO');
        try {
            return Array.isArray(JSON.parse(value_list.replaceAll(`'`, `"`))) ? `${value_list}.forEach(${variable_element} => {${statements_do}})` : generateError(`"FOREACH X IN LIST X DO X" must have a list value`);
        } catch {
            return generateError(`"FOREACH X IN LIST X DO X" must have a list value`);
        }
    },
    
    open_url: (block: any) => {
        var value_url = javascriptGenerator.valueToCode(block, 'URL', javascriptGenerator.ORDER_ATOMIC);
        var dropdown_type = block.getFieldValue('TYPE');
        return `window.open(${value_url}, '_${dropdown_type}')`;
    },
    
    newline: (block: any) => ['\'' + '\n' + '\'', javascriptGenerator.ORDER_ATOMIC],
    
    current_time: (block: any) => {
        var dropdown_option = block.getFieldValue('OPTION');
        switch (dropdown_option) {
            case 'YEAR':
                return [new Date().getFullYear(), javascriptGenerator.ORDER_NONE];
            case 'MONTH':
                return [new Date().getMonth() + 1, javascriptGenerator.ORDER_NONE];
            case 'DAYM':
                return [new Date().getDate(), javascriptGenerator.ORDER_NONE];
            case 'DAYW':
                return [new Date().getDay(), javascriptGenerator.ORDER_NONE];
            case 'HOUR':
                return [new Date().getHours(), javascriptGenerator.ORDER_NONE];
            case 'MINUTE':
                return [new Date().getMinutes(), javascriptGenerator.ORDER_NONE];
            case 'SECOND':
                return [new Date().getSeconds(), javascriptGenerator.ORDER_NONE];
            case 'MILLISECOND':
                return [new Date().getMilliseconds(), javascriptGenerator.ORDER_NONE];
            default:
                return ['', javascriptGenerator.ORDER_NONE];
        }
    },
    
    seconds_since_1970: (block: any) => {
        console.log(block);
        return [new Date().getTime(), javascriptGenerator.ORDER_NONE];
    },
    
    screen_info: (block: any) => {
        const option = block.getFieldValue('PROP');
        switch (option) {
            case 'WIDTH':
                return ['window.screen.width', javascriptGenerator.ORDER_NONE];
            case 'HEIGHT':
                return ['window.screen.height', javascriptGenerator.ORDER_NONE];
            case 'ASP-RATIO':
                const func = javascriptGenerator.provideFunction_('calcAspectRatio', `
                    function ${javascriptGenerator.FUNCTION_NAME_PLACEHOLDER_}(a, b) {
                        let r = a % b;
                        while (r) {
                            a = b;
                            b = r;
                            r = a % b;
                        }
                        return window.screen.width / b + ':' + window.screen.height / b;
                    }
                `)
                return [`${func}(window.screen.width, window.screen.height)`, javascriptGenerator.ORDER_FUNCTION_CALL];
            case 'COLOR-DPT':
                return ['window.screen.colorDepth', javascriptGenerator.ORDER_NONE];
        }
    },
    
    user_color_scheme: (block: any) => {
        const option = block.getFieldValue('SCHEME');
        return [`matchMedia('(prefers-color-scheme: ${option})').matches`, javascriptGenerator.ORDER_NONE];
    },
    
    number_with_precision: (block: any) => {
        const number = block.getFieldValue('NUMBER');
        const decimals = block.getFieldValue('DECIMALS');
        const tens = Math.pow(10, parseInt(decimals));
        return [`Math.floor(${number} * ${tens}) / ${tens}`, javascriptGenerator.ORDER_NONE];
    
    },
    
    device_has_connection: (block: any) => {
        const option = block.getFieldValue('OPT');
        return [`navigator.onLine === ${option === 'ONLINE'}`, javascriptGenerator.ORDER_NONE];
    },
    
    element_on_click: (block: any) => {
        const element = block.getFieldValue('ELEMENT');
        var statements = javascriptGenerator.statementToCode(block, 'ACTIONS');
        return `try {
            ${element}.addEventListener('click', () => {${statements}});
        } catch {
            ${generateError(`Error on block WHEN ${block.getField('ELEMENT').selectedOption_[0]} IS CLICKED DO`)}
        }`;
    },
    
    element_on_load: (block: any) => {
        const element = block.getFieldValue('ELEMENT');
        var statements = javascriptGenerator.statementToCode(block, 'ACTIONS');
        return `try {
            ${element}.addEventListener('load', () => {${statements}});
        } catch {
            ${generateError(`Error on block WHEN ${block.getField('ELEMENT').selectedOption_[0]} IS LOADED DO`)}
        }`;
    },

});