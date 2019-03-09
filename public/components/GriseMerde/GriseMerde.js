const pug = require('pug');
const template = `
- var cl = classes
div(class="grise-merde" class=cl)
 | !{inner}
 |
`;
const templateGen = pug.compile(template);

export class GriseMerde {
    constructor(object = {
        inner: "",
        classes: ""
    }) {
        object.classes = object.classes ? object.classes : "small-grise-merde";
        object.inner = object.inner instanceof Node ? object.inner.outerHTML : object.inner;
        this._object = object;
    }

    render() {
        let el = document.createElement("span");
        el.innerHTML = templateGen(this._object);
        return el;
    }

}
