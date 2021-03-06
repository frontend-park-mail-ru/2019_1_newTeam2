'use strict';

const checkboxTemplate = require('Templates/Checkbox.pug');

const noop = () => { };
const validSizes = ['big', 'small'];

export class Checkbox {
    constructor({
        id = '0',
        size = 'small',
        handler = noop,
    } = {}) {
        this._id = id;
        this._size = validSizes.includes(size) ? size : 'small';
        this._handler = handler;
    }


    render() {
        const outer = document.createElement('span');
        outer.innerHTML = checkboxTemplate({
            'size': 'checkbox_size_' + this._size,
            'num': this._id
        });

        outer.addEventListener('click', this._handler);

        return outer;
    }
}
