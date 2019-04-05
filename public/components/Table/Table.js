
export class Table {
	/**
	 * Creates a new Table.
	 * @class
	 */
	constructor({
		classes = 'boardstyle'
	} = {}) {
		this._classes = classes;
		this._div = document.createElement('div');
	}

	/**
	 * getter of data
	 * @returns {object} - data to render in table
	 */
	get data() {
		return this._data
	}

	/**
	 * setter of data
	 * @params {object} data to render in table
	 */
	set data(data) {
		this._data = data;
	}

	/**
	 * getter of header
	 * @returns {object} the header of a table
	 */
	get fields() {
		return this._fields;
	}

	/**
	 * setter of header
	 * @params {object} the header of a table
	 */
	set fields(fields) {
		this._fields = fields;
	}

	/**
	 * renders the table
	 * @returns {object} - the DOM element: div with rendered element
	 */
	render() {
		if(this._fields === undefined)
			this._fields = Object.keys(this._data[0]);
		console.log("this._fields");
		console.log(this._fields);
		console.log("this._data");
		console.log(this._data);
		this._div.innerHTML = tableTemplate({'header': this._fields, 'data': this._data, 'keys': Object.keys(this._data[0]), 'styles': this._classes});
		return this._div;
	};
}
