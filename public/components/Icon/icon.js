const noop = () => {};

export class Icon {

	constructor({
		parent = document.body,
		src = "",
		handler = noop,
	} = {}) {
		this._parent = parent;
		this._src = src;
		this._handler = handler;
	}

	render() {
		const icon = document.createElement('img');
		icon.src = this._src;
		icon.classList.add('icon');
		icon.addEventListener(click, handler);
	
		this._parent.appendChild(icon);	
	}
}
