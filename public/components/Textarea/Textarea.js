'use strict';

const textareaTemplate = require('Templates/Textarea.pug');

export class Input {
    constructor(object = {
        id: '',
        value: '',
        placeholder: 'Ваше сообщение',
        disabled: '',
    }) {
        this._object = object;
    }

    render() {
        let el = document.createElement('div');
        el.innerHTML = textareaTemplate(this._object);
        return el;
    }
}
