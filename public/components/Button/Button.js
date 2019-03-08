'use strict';
import {compile} from 'pug';

const template = `button(class="Button" class=additionalClass) #{text}`;
const templateGen = compile(template);

const noop = () => {};

export class Button {
    constructor({
                    type = 'buttonBig',
                    textContent = '',
                    someFunction = noop,
                } = {}) {
        this._text = textContent;
        this._type = type;
        this._handler = someFunction;
    }

    render () {
        let button = document.createElement('span');
        button.innerHTML = templateGen({
            additionalClass: this._type,
            text: this._text
        });
        button.addEventListener('click', this._handler);
        return button;
    }
}