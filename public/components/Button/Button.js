const noop = () => {};

export class Button {
    constructor({
                    parent = document.body,
                    type = "buttonBig",
                    textContent = "",
                    someFunction = noop,
                } = {}) {
        this._el = parent;
        this._text = textContent;
        this._type = type;
        this._handler = someFunction;
    }

    set data(data) {
        this._type = data;
    }

    get data() {
        return this._type;
    }

    render () {
        const button = document.createElement("button");
        button.addEventListener("click", this._handler);
        switch(this._type) {
            case "buttonBig":
                button.className = "Button buttonBig";
                break;
            case "buttonSmall":
                button.className = "Button buttonSmall";
                break;
            default:
                button.className = "Button buttonBig";
                break;
        }
        button.textContent = this._text;
        this._el.appendChild(button);
    }
}