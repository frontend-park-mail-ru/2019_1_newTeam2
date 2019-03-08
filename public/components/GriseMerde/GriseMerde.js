const pug = require('pug');
const template = `
- var cl = classes
div(class="grise-merde" class=cl)
 | !{inner.outerHTML}
 |
`;
const templateGen = pug.compile(template);

export class GriseMerde {
    constructor(object = {
        inner: "",
        classes: ""
    }) {
        object.classes = object.classes ? object.classes : "small-grise-merde";
        this._object = object;
    }

    render() {
        let el = document.createElement("span");
        el.innerHTML = templateGen(this._object);
        return el;
    }

}