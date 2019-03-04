const pug = require('pug');
const template = "input.input(type=type, value=value, placeholder=placeholder, name=name)";
const templateGen = pug.compile(template);

export class InputComponent {
    constructor(object = {
                    name: "login",
                    type: "login",
                    value: "",
                    placeholder: ""
                }) {
        this._object = object;
    }

    render() {
        return templateGen(this._object);
    }

}