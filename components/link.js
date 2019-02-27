const noop = () => {};

export class Link {

	constructor({
		parent = document.body,
		name = "",
		handler = noop,
	} = {}) {
		this._parent = parent;
		this._name = name;
		this._handler = handler;
	}

	render() {
		const link = document.createElement('span');
		link.textContent = this._name;
		link.classList.add('link');
		link.addEventListener("click", this._handler);
	
		this._parent.appendChild(link);	
	}
}
