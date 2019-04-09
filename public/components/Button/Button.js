'use strict';

const noop = () => {};
const validTypes = ['primary', 'secondary'];

export class Button {
    constructor({
        type = 'primary',
        name = '',
        handler = noop,
    } = {}) {
        this._name = name;
        this._type = validTypes.includes(type) ? type : 'primary';
        this._handler = handler;
    }

    render () {
        const outer = document.createElement('div');
        outer.classList.add('inline-block-el');
		outer.innerHTML = buttonTemplate({
            'type_class': 'button_type_' + this._type,
            'text_class': 'button__text_type_' + this._type,
            'name': this._name
        });

		outer.addEventListener('click', this._handler);

		return outer;
    }
}
