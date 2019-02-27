'use strict'

const noop = () => {}

export class Upload {
	constructor({
		parent = document.body,
		type = 'file',
		callback = noop,

	} = {}) {
		this._parent = parent;
		this._type = type;
		this._callback = callback;
	}

	render() {
		const upload = document.createElement('input');
		upload.setAttribute('type', 'file');
		switch(this._type) {
			case 'image':
				upload.setAttribute('accept', 'image/*');
				img.classList.add(this._type);
				break;
			case 'file':
				img.classList.add(this._type);
				break;
		}
		img.addEventListener('click', this._callback);
		this._parent.appendChild(upload);
	}
}