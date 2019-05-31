'use strict';

const textareaTemplate = require('Templates/Textarea.pug');

export class Textarea {
    constructor(object = {
        id: '',
        value: '',
        placeholder: '',
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
