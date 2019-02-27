const noop = () => {};

export class Checkbox {

	constructor({
					parent = document.body,
					id = '0',
					size = 'small',
					handler = noop,
					label = "",
				} = {}) {
		this._parent = parent;
		this._id = id;
		this._size = size;
		this._handler = handler;
		this._label = label;
	}


	render() {
		const outerDiv = document.createElement('div');
		outerDiv.classList.add('checkbox');

		if (this._size === 'small') {
			outerDiv.classList.add('small');
		} else if (this._size === 'big') {
			outerDiv.classList.add('big');
		} else {
			outerDiv.classList.add('small');
		}

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = this._id;

		const label = document.createElement('label');
		label.htmlFor = this._id;

		outerDiv.addEventListener("click", this._handler);

		this._parent.appendChild(outerDiv);
		outerDiv.appendChild(checkbox);
		outerDiv.appendChild(label);
	}
}