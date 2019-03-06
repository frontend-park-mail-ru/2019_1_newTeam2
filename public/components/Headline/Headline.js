const noop = () => {};

export class Headline {
    constructor({
        parent = document.body,
        size = "h1",
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
        const headLineBoard = document.createElement('div');
        headLineBoard.addEventListener("click", this._handler);
        const headLine = document.createElement('p');
        headLine.textContent = this._text;
        headLine.classList.add("Headline");
        switch(this._size) {
            case "h1":
                headLine.classList.add("h1");
                break;
            case "h2":
                headLine.classList.add("h2");
                break;
            case "h3":
                headLine.classList.add("h3");
                break;
            case "h4":
                headLine.classList.add("h4");
                break;
            case "h5":
                headLine.classList.add("h5");
                break;
            case "h6":
                headLine.classList.add("h6");
                break;
            default:
                headLine.classList.add("h6");
                break;
        }

        headLineBoard.appendChild(headLine);
        this._el.appendChild(headLineBoard);
    }
}