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
  
	<div class="checkbox small">
        <input type="checkbox" id="checkboxInput1"/>
        <label for="checkboxInput1"></label>
    </div>

	render() {
		const outerDiv = document.createElement('div');
		div.classList.add('checkbox');
		
		if (this._size === 'small') {
			div.classList.add('small');
		} else if (this._size === 'big') {
			div.classList.add('big');
		} else {
			div.classList.add('small');
		}
		
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = this._id;

		const label = document.createElement('label');
		label.for = this._id;
	
		outerDiv.addEventListener(click, handler);
	
		this._parent.appendChild(outerDiv);
		outerDiv.appendChild(checkbox);
		outerDiv.appendChild(label);
	}
}
