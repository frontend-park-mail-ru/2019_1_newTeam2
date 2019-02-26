export class InputComponent {
    constructor({
                    parent = document.body,
                    name = "login",
                    type = "login",
                    value = "",
                    placeholder = ""
                } = {}) {
        this._el = parent;
        this._name = name;
        this._type = type;
        this._value = value;
        this._placeholder = placeholder;
    }

    render() {
        const input = document.createElement('input');
        input.setAttribute("type", this._type);
        input.setAttribute("name", this._name);
        input.setAttribute("value", this._value);
        input.setAttribute("placeholder", this._placeholder);
        input.classList.add("input");
        input.classList.add(`input-{this._type}`);
        this._el.appendChild(input);
    }

}