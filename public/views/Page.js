import {View} from 'Views/View.js';

import {Icon} from 'Components/Icon/Icon.js';
import {Headline} from 'Components/Headline/Headline.js';
import {Pagination} from 'Components/pagination.js';

import router from 'Services/router.js';

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