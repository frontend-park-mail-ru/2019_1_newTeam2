const noop = () => {};

const pug = require('pug');
const template = `p(class="Headline" class=additionalClass) #{text}`;
const templateGen = pug.compile(template);

export class Headline {
    constructor({
        size = "h1",
        textContent = "",
        someFunction = noop,
                } = {}) {
        this._text = textContent;
        this._size = size;
        this._handler = someFunction;
    }

    render () {
        let headLineBoard = document.createElement('div');
        headLineBoard.addEventListener("click", this._handler);
        headLineBoard.innerHTML = templateGen({
            additionalClass: this._size,
            text: this._text
        });
        return headLineBoard;
    }
}