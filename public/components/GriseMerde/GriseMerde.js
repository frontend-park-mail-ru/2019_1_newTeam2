
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
        el.innerHTML = grisemerdeTemplate(this._object);
        return el;
    }

}
