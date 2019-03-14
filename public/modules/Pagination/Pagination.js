'use strict';

import {AjaxModule} from "../ajax.js";

const ajax = new AjaxModule();

const application = document.getElementById('application');

export class Pagination {
    constructor({
        rows_per_page = 10
    } = {}) {
        this.page = 1;
        this.rows_per_page = rows_per_page;
    }


    render() {
        return ajax.doGet({
            //path: `https://ancient-bastion-96223.herokuapp.com/users?rows_per_page=${this.rows_per_page}&page=${this.page}/`
            path: `users?rows=${this.rows_per_page}&page=${this.page}`
        });
    }

    pageNum(number) {
        this.page = number;
        return this.render();
    }

    nextPage() {
        this.page++;
        // console.log(this.page);
        return this.render();
    }

    previousPage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        // console.log(this.page);
        return this.render(); // we can do this because table can produce only one Node from class
    }
}
