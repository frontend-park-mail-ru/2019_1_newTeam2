'use strict';

const buttonTemplate = require('Templates/Button.pug');

const noop = () => { };
const validTypes = ['primary', 'secondary'];

export class Button {
    constructor({
        type = 'primary',
        name = '',
        handler = noop,
        id = '',
        is_hidden = ''
    } = {}) {
        this._name = name;
        this._type = validTypes.includes(type) ? type : 'primary';
        this._handler = handler;
        this._id = id;
        this._is_hidden = is_hidden;
    }

    render() {
        const outer = document.createElement('span');
        outer.innerHTML = buttonTemplate({
            'type_class': 'button_type_' + this._type,
            'text_class': 'button__text_type_' + this._type,
            'name': this._name,
            'is_hidden': this._is_hidden,
            'id': this._id,
        });

        outer.addEventListener('click', this._handler);

        return outer;
    }
}
