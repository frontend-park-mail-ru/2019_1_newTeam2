'use strict';

const noop = () => {};
const validSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export class Link {
	constructor({
		name = '',
		size = '',
		handler = noop,
	} = {}) {
		this._name = name;
		this._size = validSizes.includes(size) ? size : '';
		this._handler = handler;
	}

	render() {
		const outer = document.createElement('span');
		outer.innerHTML = linkTemplate({ 'size': 'link_size_' + this._size, 'name': this._name });
		
		outer.addEventListener('click', this._handler);
	
		return outer;
	}
}
