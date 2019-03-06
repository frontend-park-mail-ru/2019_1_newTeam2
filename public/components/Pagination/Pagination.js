const pug = require('pug');
// import {AjaxModule} from "./modules/ajax";
const template = ``;
const templateGen = pug.compile(template);

export class PaginationComponent {
    constructor(object = {
        rows_per_page: 10,
        src: ""
    }) {
        this.page = 1;
        this._object = object;
        this.el = document.createElement("span");
    }


    render() {
        // get data
        // object.data = data
        this.el.innerHTML = templateGen(this._object);
        return this.el;
    }

    pageNum(number) {
        page = number;
        return this.render();
    }

    nextPage() {
        page++;
        return this.render();
    }

    previousPage() {
        page = page < 2 ? 1 : page--;
        return this.render();
    }
}