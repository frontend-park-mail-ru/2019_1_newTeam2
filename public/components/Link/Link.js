const noop = () => {};

export class Link {
    constructor({
                    parent = document.body,
                    size = "h6",
                    textContent = "",
                    someFunction = noop,
                } = {}) {
        this._el = parent;
        this._text = textContent;
        this._size = size;
        this._handler = someFunction;
    }

    set data(data) {
        this._text = data;
    }

    get data() {
        return this._text;
    }

    render () {
        const link = document.createElement('span');
        link.textContent = this._text;
        link.addEventListener("click", this._handler);
        switch(this._size) {
            case "h1":
                link.className = "Link link_h1";
                break;
            case "h2":
                link.className = "Link link_h2";
                break;
            case "h3":
                link.className = "Link link_h3";
                break;
            case "h4":
                link.className = "Link link_h4";
                break;
            case "h5":
                link.className = "Link link_h5";
                break;
            case "h6":
                link.className = "Link link_h6";
                break;
            default:
                link.className = "Link link_h6";
                break;
        }

        this._el.appendChild(link);
    }
}