const noop = () => {};

const validSizes = ["h1", "h2", "h3", "h4", "h5", "h6"];

export class Link {

	constructor({
		parent = document.body,
		name = "",
		size = "h1",
		handler = noop,
	} = {}) {
		this._parent = parent;
		this._name = name;
		this._size = size;
		this._handler = handler;
	}

	render() {
		const link = document.createElement('span');
		link.textContent = this._name;
		link.classList.add('link');
		
		if (validSizes.includes(this._size)) {
			link.classList.add(this._size);
		}
		
		link.addEventListener("click", this._handler);
	
		this._parent.appendChild(link);	
	}
}
