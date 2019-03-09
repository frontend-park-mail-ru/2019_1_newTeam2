'use strict';
const pug = require('pug');

const template = 'span(class="link", class=size) #{name}';
const templateGen = pug.compile(template);

const noop = () => {};
const validSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export class Link {
	constructor({
		name = '',
		size = 'h1',
		handler = noop,
	} = {}) {
		this._name = name;
		this._size = validSizes.includes(size) ? size : '';
		this._handler = handler;
	}

	render() {
		const outer = document.createElement('span');
		outer.innerHTML = templateGen({ 'size': this._size, 'name': this._name });
		
		outer.addEventListener('click', this._handler);
	
		return outer;
	}
}
