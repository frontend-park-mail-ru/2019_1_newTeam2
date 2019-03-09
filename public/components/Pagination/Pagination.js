// import {AjaxModule} from "./modules/ajax";
import {Table} from "../Table/Table.js";

const pug = require('pug');
const template = ``;
const templateGen = pug.compile(template);

export class Pagination {
    constructor({
        rows_per_page = 10,
        src = ""
    } = {}) {
        this.page = 1;
        this._object = {
            rows_per_page: rows_per_page,
            src: src
        };
        this.el = document.createElement("span");
    }


    render() {
        // get data
        // object.data = data
        this.el.innerHTML = templateGen(this._object);
        return this.el;
    }

    pageNum(number) {
        this.page = number;
        return this.render();
    }

    nextPage() {
        this.page++;
        return this.render();
    }

    previousPage() {
        this.page = this.page < 2 ? 1 : this.page--;
        return this.render();
    }
}
