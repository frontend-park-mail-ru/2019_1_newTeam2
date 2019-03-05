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
		const pug = require('pug');
		const templateString = 'img(src=path, class=icon)';
		const inner = pug.render(templateString, {'path': this._src});
		
		const outer = document.createElement('div');
		outer.innerHTML = inner;

		outer.addEventListener(click, handler);
	
		this._parent.appendChild(outer);	
	}
}
