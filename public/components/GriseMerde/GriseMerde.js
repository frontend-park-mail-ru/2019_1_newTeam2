'use strict';

const grisemerdeTemplate = require('Templates/GriseMerde.pug');

const validSizes = ['small', 'big'];

export class GriseMerde {
    constructor(object = {
        inner: '',
        size: '',
        id: '',
    }) {
        object.size = validSizes.includes(object.size) ? object.size : 'small';
        object.size = 'grise-merde_size_' + object.size;
        object.inner = object.inner instanceof Node ? object.inner.outerHTML : object.inner;
        this._object = object;
    }

    render() {
        let el = document.createElement('div');
        el.innerHTML = grisemerdeTemplate(this._object);
        return el;
    }
}
