const noop = () => {};

export class Checkbox {

	constructor({
		parent = document.body,
		id = '0',
		size = 'small',
		handler = noop,
	} = {}) {
		this._parent = parent;
		this._id = id;
		this._size = 'small';
		this._handler = handler;
	}

	render() {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('checkbox');
		if (this._size === 'small') {
			checkbox.classList.add('small');
		} else if (this._size === 'big') {
			checkbox.classList.add('big');
		}

		checkbox.addEventListener(click, handler);
	
		this._parent.appendChild(checkbox);	
	}
}
