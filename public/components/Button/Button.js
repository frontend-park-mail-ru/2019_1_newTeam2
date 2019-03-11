'use strict';
const pug = require('pug');
const template = `button(class="button", class=size) #{name}`;
const templateGen = pug.compile(template);

const noop = () => {};
const validSizes = ['big', 'small'];

export class Button {
    constructor({
        size = 'big',
        name = '',
        handler = noop,
    } = {}) {
        this._name = name;
        this._size = validSizes.includes(size) ? size : 'small';
        this._handler = handler;
    }

    render () {
        const outer = document.createElement('div');
        outer.classList.add('inline-block-el');
		outer.innerHTML = templateGen({'size': this._size, 'name': this._name});

		outer.addEventListener('click', this._handler);

		return outer;
    }
}
