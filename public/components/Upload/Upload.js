'use strict'

const noop = () => {}

export class Upload {
	constructor({
		parent = document.body,
		type = 'file',
		callback = noop,
		outerId = 'outerDivUpload',
	} = {}) {
		this._parent = parent;
		this._type = type;
		this._callback = callback;
		this._outerId = outerId;
	}

	render() {
		const pug = require('pug');
		const innerHTMLString = 'input(type="file", class=type, accept=files)';
		let type = 'upload ';
		let files = '';
		switch(this._type) {
			case 'image':
				type += this._type;
				files = 'image/*';
				break;
			case 'file':
				type += this._type;
				break;
		}
		const html = pug.render(innerHTMLString, {'type': type,
		'files': files});
		const outerDiv = document.createElement('div');
		outerDiv.id = this._outerId;
		outerDiv.innerHTML = html;
		outerDiv.addEventListener('click', this._callback);
		this._parent.appendChild(outerDiv);
	}
}