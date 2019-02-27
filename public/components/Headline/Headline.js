const noop = () => {};

export class Headline {
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
        const headLineBoard = document.createElement('div');
        headLineBoard.className = "Headline";
        headLineBoard.addEventListener("click", this._handler);
        const headLine = document.createElement('p');
        headLine.textContent = this._text;
        switch(this._size) {
            case "h1":
                headLine.className = "headline_h1";
                break;
            case "h2":
                headLine.className = "headline_h2";
                break;
            case "h3":
                headLine.className = "headline_h3";
                break;
            case "h4":
                headLine.className = "headline_h4";
                break;
            case "h5":
                headLine.className = "headline_h5";
                break;
            case "h6":
                headLine.className = "headline_h6";
                break;
            default:
                headLine.className = "headline_h6";
                break;
        }

        headLineBoard.appendChild(headLine);
        this._el.appendChild(headLineBoard);
    }
}