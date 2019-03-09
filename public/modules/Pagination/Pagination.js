'use strict';

import {AjaxModule} from "../ajax.js";

const ajax = new AjaxModule();

const application = document.getElementById('application');

export class Pagination {
    constructor({
        rows_per_page = 10
    } = {}) {
        this.page = 1;
        this._object = {
            rows_per_page: rows_per_page
        };
    }


    render() {
        return ajax.doGet({path: '/users'});
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
