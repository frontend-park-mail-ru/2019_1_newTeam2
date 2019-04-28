import {View} from '/views/View.js';

import {Icon} from '/components/Icon/Icon.js';
import {Headline} from '/components/Headline/Headline.js';
import {Pagination} from '/components/pagination.js';

import router from '/services/router.js';

const application = document.getElementById('application');

export class Page extends View {
    renderBase() {
        this.outer = application;
        this.outer.innerHTML = '';
        this.forHeader = document.createElement('div');
        this.forContent = document.createElement('div');
        this.forPagination = document.createElement('div');

        this.outer.appendChild(this.forHeader);
        this.outer.appendChild(this.forContent);
        this.outer.appendChild(this.forPagination);
    }

    renderBaseHeader(nameOfPage = '') {
        this.forHeader.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

        this.forHeader.appendChild(new Headline({
            textContent: nameOfPage,
        }).render());

    }

    renderBasePagination() {
        const pagination = new Pagination();
        pagination.render(this.forPagination);
    }
}