const pug = require('pug');
const template = `input.input(type=type, value=value, placeholder=placeholder, name=name)`;
const templateGen = pug.compile(template);

export class Input {
    constructor(object = {
                    name: "",
                    type: "text",
                    value: "",
                    placeholder: ""
                }) {
        object.type = object.type ? object.type : "text";
        this._object = object;
    }

    render() {
        let el = document.createElement("span");
        el.innerHTML = templateGen(this._object);
        return el;
    }
}