'use strict';
const pug = require('pug');

const template = `
div
    label(for=id) #{label}
input.input(type=type, value=value, placeholder=placeholder, id=id)`;
const templateGen = pug.compile(template);

const validTypes = ['text', 'email', 'tel', 'password'];

export class Input {
    constructor(object = {
                    id: '',
                    type: 'text',
                    value: '',
                    placeholder: '',
                    label: ''
                }) {
        object.type = validTypes.includes(object.type)? object.type : 'text';
        this._object = object;
    }

    render() {
        let el = document.createElement('div');
        el.innerHTML = templateGen(this._object);
        return el;
    }
}
