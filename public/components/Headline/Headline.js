'use strict';
const pug = require('pug');

const template = `p(class="headline" class=size) #{text}`;
const templateGen = pug.compile(template);

const validSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const noop = () => {};

export class Headline {
    constructor({
        size = 'h1',
        textContent = '',
        someFunction = noop,
                } = {}) {
        this._text = textContent;
        this._size = validSizes.includes(size) ? size : '';
		this._handler = someFunction;
    }

    render () {
        let headLineBoard = document.createElement('div');
        headLineBoard.addEventListener('click', this._handler);
        headLineBoard.innerHTML = templateGen({
            size: this._size,
            text: this._text
        });
        return headLineBoard;
    }
}
