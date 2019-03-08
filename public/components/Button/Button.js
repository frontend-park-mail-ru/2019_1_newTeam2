const noop = () => {};

const pug = require('pug');
const template = `button(class="Button" class=additionalClass) #{text}`;
const templateGen = pug.compile(template);

export class Button {
    constructor({
                    type = "buttonBig",
                    textContent = "",
                    someFunction = noop,
                } = {}) {
        this._text = textContent;
        this._type = type;
        this._handler = someFunction;
    }

    render () {
        let button = document.createElement("span");
        button.innerHTML = templateGen({
            additionalClass: this._type,
            text: this._text
        });
        button.addEventListener("click", this._handler);
        return button;
    }
}