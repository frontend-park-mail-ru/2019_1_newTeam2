'use strict'

const noop = () => {}

export class Image {
	constructor({
		parent = document.body,
		callback = noop,
		type = 'dictionary',
		src = '',
	} = {}) {
		this._parent = parent;
		this._callback = callback;
		this._typeset = {
			'profile': true,
			'dictionary': true,
		};
		this._src = src;
		this._type = type;
	}

	render() {
		const img = document.createElement('img');
		if(this._src == '') {
			throw new Error('No src');
		}
		img.addEventListener('click', this._callback);
		img.setAttribute('src', this._src);
		if (this._type in this._typeset) {
			img.classList.add(this._type);
		} else {
			img.classList.add('dictionary');
		}
		this._parent.appendChild(img);
	};
}