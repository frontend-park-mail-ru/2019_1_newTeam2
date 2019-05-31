'use strict';

const variantTemplate = require('Templates/Variant.pug');

const validSizes = ['small', 'big'];

export class Variant {
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
        el.innerHTML = variantTemplate(this._object);
        return el;
    }
}
