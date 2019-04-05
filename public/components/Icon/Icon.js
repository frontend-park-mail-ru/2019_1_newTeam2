'use strict';

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
		outer.innerHTML = iconTemplate({'path': this._src});

		outer.addEventListener('click', this._handler);
	
		return outer;
	}
}
