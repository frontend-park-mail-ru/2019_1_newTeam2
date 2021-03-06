'use strict';

const imageTemplate = require('Templates/Image.pug');

const noop = () => {};

export class Image {
    /**
     * Creates a new Image.
     * @class
     */
    constructor({
        callback = noop,
        type = 'dictionary',
        src = '',
    } = {}) {
        this._callback = callback;
        this._typeset = {
            'profile': true,
            'dictionary': true,
        };
        this._src = src;
        this._type = type;
    }
    /**
     * renders the image
     * @returns {object} - the DOM element: div with rendered element
     */
    render() {
        let el = document.createElement('div');
        const type = this._type in this._typeset ? this._type : 'dictionary';
        el.addEventListener('click', this._callback);
        el.innerHTML = imageTemplate({'path': this._src, 'type': 'image_type_' + type});
        return el;
    }
}
