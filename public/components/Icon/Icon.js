'use strict';

const noop = () => {};

export class Icon {

	constructor({
		src = '',
		handler = noop,
		id = '',
	} = {}) {
		this._src = src;
		this._handler = handler;
		this._id = id;
	}

	render() {
		const outer = document.createElement('span');
		outer.innerHTML = iconTemplate({'path': this._src, 'id': this._id});

		outer.addEventListener('click', this._handler);
	
		return outer;
	}
}
