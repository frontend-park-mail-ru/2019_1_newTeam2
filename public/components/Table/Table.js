'use strict'

export class Table {
	constructor({
		parent = document.body,
		outerId = 'outerDivTable',
	} = {}) {
		this._parent = parent;
		this._outerId = outerId;
	}

	get data() {
		return this._data
	}

	set data(data = []) {
		this._data = data;
	}

	render() {
		let pug = require('pug');
		const innerHTMLString = ``;
		const html = pug.render(innerHTMLString, {'data': this._data});
		const div = document.createElement('div');
		div.id = this._outerId;
		div.innerHTML = html;
		this._parent.appendChild(div);
	};
}