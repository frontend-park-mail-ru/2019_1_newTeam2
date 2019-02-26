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
        const headLine = document.createElement('p');
        headLine.textContent = this._text;

        switch(this._size) {
            case "h1":
                headLine.className = "h1";
                break;
            case "h2":
                headLine.className = "h2";
                break;
            case "h3":
                headLine.className = "h3";
                break;
            case "h4":
                headLine.className = "h4";
                break;
            case "h5":
                headLine.className = "h5";
                break;
            case "h6":
                headLine.className = "h6";
                break;
            default:
                headLine.className = "h6";
                break;
        }

        headLineBoard.appendChild(headLine);
        this._el.appendChild(headLineBoard);
    }
}