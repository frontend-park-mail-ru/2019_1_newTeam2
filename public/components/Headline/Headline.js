'use strict';

const validSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const noop = () => {};

export class Headline {
    constructor({
        size = 'h1',
        textContent = '',
        someFunction = noop,
    } = {}) {
        this._text = textContent;
        this._size = validSizes.includes(size) ? size : 'h1';
        this._handler = someFunction;
    }

    render () {
        let headLineBoard = document.createElement('span');
        headLineBoard.addEventListener('click', this._handler);
        headLineBoard.innerHTML = headlineTemplate({
            size: 'headline_size_' + this._size,
            text: this._text
        });
        return headLineBoard;
    }
}
