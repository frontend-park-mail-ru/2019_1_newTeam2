/*'use strict'

// import {TableTemplate} from './TableTemplate.js';

export class Table {
	constructor({
		parent = document.body,
	} = {}) {
		this._parent = parent;
	}

	get data() {
		return this._data
	}

	set data(data = []) {
		this._data = data;
	}

	render() {
		let pug = require('pug');
		let attempt = pug.renderFile('./Table.pug');
		console.log(attempt);
		this._parent.innerHTML = attempt;
		// this.parent.innerHTML = this._template(data || null)

	};
}*/