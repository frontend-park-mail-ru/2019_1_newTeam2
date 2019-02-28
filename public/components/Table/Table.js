'use strict'

export class Table {
	/**
	 * Creates a new Table.
	 * @class
	 */
	constructor({
		outerId = 'outerDivTable',
		classes = 'boardstyle'
	} = {}) {
		this._outerId = outerId;
		this._classes = classes;
	}

	/**
	 * getter
	 * @returns {object} - data to render in table
	 */
	get data() {
		return this._data
	}

	/**
	 * setter
	 * @params {object} data to render in table
	 */
	set data(data = []) {
		this._data = data;
	}

	/**
	 * getter
	 * @returns {object} the header of a table
	 */
	get fields() {
		return this._fields;
	}

	/**
	 * setter
	 * @params {object} the header of a table
	 */
	set fields(fields = []) {
		this._fields = fields;
	}

	/**
	 * renders the table
	 * @returns {object} - the DOM element: div with rendered element
	 */
	render() {
		let pug = require('pug');
		const innerHTMLString = `table(class='res')
		tr(class='res_h')
			each key in header
				th=key
			each line in data
				tr(class='line')
					each key in header
						td(class='cell')=(key in line) ? line[key] : ''`;
		const html = pug.render(innerHTMLString, {'header': this.fields, 'data': this.data, 'styles': this._classes});
		const div = document.createElement('div');
		div.id = this._outerId;
		div.innerHTML = html;
		return div;
	};
}
