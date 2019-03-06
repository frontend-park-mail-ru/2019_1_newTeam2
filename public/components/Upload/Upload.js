'use strict'

const noop = () => {}

export class Upload {
	/**
	 * Creates a new Upload.
	 * @class
	 */
	constructor({
		type = 'file',
		callback = noop,
		outerId = 'outerDivUpload',
	} = {}) {
		this._type = type;
		this._callback = callback;
		this._outerId = outerId;
	}

	/**
	 * renders the upload
	 * @returns {object} - the DOM element: div with rendered element
	 */
	render() {
		const pug = require('pug');
		const innerHTMLString = `label
		input(type="file", class=type, accept=files)
		span='Выберите ' + (files.length === 0 ? 'файл' : 'изображение')`;
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
		outerDiv.classList.add(this._outerId);
		outerDiv.innerHTML = html;
		outerDiv.addEventListener('click', this._callback);
		return outerDiv;
	}
}
