'use strict';
const pug = require('pug');

const template = 'img(src=path, class="icon")';
const templateGen = pug.compile(template);

const noop = () => {};

export class Icon {

	constructor({
		src = '',
		handler = noop,
	} = {}) {
		this._src = src;
		this._handler = handler;
	}

	render() {
		const outer = document.createElement('span');
		outer.innerHTML = templateGen({'path': this._src});

		outer.addEventListener('click', this._handler);
	
		return outer;
	}
}
