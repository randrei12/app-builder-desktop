import Blockly from 'blockly';

Object.assign(Blockly.Blocks, {
    go_to: {
        init: function () {
            this.jsonInit({
                "type": "go_to",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "LOCATION",
                        "check": "String"
                    },
                    {
                        "type": "input_dummy",
                        "name": "VALUE",
                    }
                ],
                "previousStatement": null,
            });
        }
    },
    
    set_timeout: {
        init: function () {
            this.jsonInit({
                "type": "set_timeout",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "TIME",
                        "check": "Number"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "CODE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
            });
        }
    },
    
    set_interval: {
        init: function () {
            this.jsonInit({
                "type": "set_interval",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "TIME",
                        "check": "Number"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "CODE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
            });
        }
    },
    
    test_true_false: {
        init: function () {
            this.jsonInit({
                "type": "test_true_false",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "LOGIC"
                    },
                    {
                        "type": "input_value",
                        "name": "TRUE"
                    },
                    {
                        "type": "input_value",
                        "name": "FALSE"
                    }
                ],
                "output": null,
            });
        }
    },
    
    foreach: {
        init: function () {
            this.jsonInit({
                "type": "foreach",
                "args0": [
                    {
                        "type": "field_variable",
                        "name": "ELEMENT",
                        "variable": "element",
                    },
                    {
                        "type": "input_value",
                        "name": "LIST",
                        "check": "Array"
                    },
                    {
                        "type": "input_statement",
                        "name": "DO"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
            });
        }
    },
    
    open_url: {
        init: function () {
            this.jsonInit({
                "type": "open_url",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "URL",
                        "check": "String"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "TYPE",
                        "options": [
                            [
                                "new",
                                "blank"
                            ],
                            [
                                "current",
                                "self"
                            ]
                        ]
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
            });
        }
    },
    
    newline: {
        init: function () {
            this.jsonInit({
                "type": "newline",
                "message0": "newline",
                "output": null,
            });
        }
    },
    
    current_time: {
        init: function () {
            this.jsonInit({
                "type": "from_current_time_get",
                "message0": "from current time get %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "OPTION",
                        "options": [
                            [
                                "year",
                                "YEAR"
                            ],
                            [
                                "month",
                                "MONTH"
                            ],
                            [
                                "day of the month",
                                "DAYM"
                            ],
                            [
                                "day of the week",
                                "DAYW"
                            ],
                            [
                                "hour",
                                "HOUR"
                            ],
                            [
                                "minute",
                                "MINUTE"
                            ],
                            [
                                "second",
                                "SECOND"
                            ],
                            [
                                "millisecond",
                                "MILLISECOND"
                            ]
                        ]
                    }
                ],
                "inputsInline": false,
                "output": null,
            });
        }
    },
    
    seconds_since_1970: {
        init: function () {
            this.jsonInit({
                "type": "seconds_since_1970",
                "message0": "seconds elapsed since 1970",
                "output": null,
            });
        }
    },
    
    screen_info: {
        init: function () {
            this.jsonInit({
                "type": "screen_info",
                "message0": "screen's  %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "PROP",
                        "options": [
                            [
                                "width",
                                "WIDTH"
                            ],
                            [
                                "height",
                                "HEIGHT"
                            ],
                            [
                                "aspect-ratio",
                                "ASP-RATIO"
                            ],
                            [
                                "color-depth",
                                "COLOR-DPT"
                            ]
                        ]
                    }
                ],
                "output": null,
            })
        }
    },
    
    user_color_scheme: {
        init: function () {
            this.jsonInit({
                "type": "user_color_scheme",
                "message0": "user prefers %1 mode",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "SCHEME",
                        "options": [
                            [
                                "dark",
                                "DARK"
                            ],
                            [
                                "light",
                                "LIGHT"
                            ]
                        ]
                    }
                ],
                "output": null,
            });
        }
    },
    
    number_with_precision: {
        init: function () {
            this.jsonInit({
                "type": "number_with_precision",
                "message0": "%1 with %2 %3 decimals",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "NUMBER",
                        "check": "Number"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_value",
                        "name": "DECIMALS",
                        "check": "Number"
                    }
                ],
                "inputsInline": true,
                "output": "Number",
            })
        }
    },
    
    device_has_connection: {
        init: function () {
            this.jsonInit({
                "type": "device_has_connection",
                "message0": "device is %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "OPT",
                        "options": [
                            [
                                "online",
                                "ONLINE"
                            ],
                            [
                                "offline",
                                "OFFLINE"
                            ]
                        ]
                    }
                ],
                "inputsInline": true,
                "output": "Boolean",
            })
        }
    },
    
    element_on_click: {
        init: function () {
            this.jsonInit({
                "type": "element_on_click",
                "message0": "when %1 is clicked %2 do %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ELEMENT",
                        "options": [
                            [
                                "option",
                                "OPTIONNAME"
                            ]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "ACTIONS"
                    }
                ],
                "inputsInline": false,
                "extensions": ["set_elements"]
            })
        }
    },
    
    element_on_load: {
        init: function () {
            this.jsonInit({
                "type": "element_on_load",
                "message0": "when %1 is loaded %2 do %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ELEMENT",
                        "options": [
                            [
                                "option",
                                "OPTIONNAME"
                            ]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "ACTIONS"
                    }
                ],
                "inputsInline": false,
                "extensions": ["set_elements"]
            })
        }
    },
});

console.log(Blockly);