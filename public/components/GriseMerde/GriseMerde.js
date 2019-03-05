const pug = require('pug');
const template = `
- var cl = classes
div(class="grise-merde" class=cl+"grise-merde")
 | #{innerHTML}
 |
`;
const templateGen = pug.compile(template);

export class GriseMerdeComponent {
    constructor(object = {
        innerHTML: "",
        classes: ""
    }) {
        this._object = object;
    }

    render() {
        return templateGen(this._object);
    }

}