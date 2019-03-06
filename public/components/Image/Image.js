'use strict'

const noop = () => {}

export class Image {
	/**
	 * Creates a new Image.
	 * @class
	 */
	constructor({
		callback = noop,
		type = 'dictionary',
		src = '',
		outerId = 'outerDivImg',
	} = {}) {
		this._callback = callback;
		this._typeset = {
			'profile': true,
			'dictionary': true,
		};
		this._src = src;
		this._type = type;
		this._outerId = outerId;
	}
	/**
	 * renders the image
	 * @returns {object} - the DOM element: div with rendered element
	 */
	render() {
		const pug = require('pug');
		const innerHTMLString = 'img(src=path, class=type)';
		const type = this._type in this._typeset ? this._type : 'dictionary';
		const html = pug.render(innerHTMLString, {'path': this._src,
		'type': this._type});
		const div = document.createElement('div');
		div.id = this._outerId;
		div.innerHTML = html;
		div.addEventListener('click', this._callback);
		return div;
	}
}