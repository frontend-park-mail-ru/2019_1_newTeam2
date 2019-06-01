import {View} from 'Views/View.js';

import {Icon} from 'Components/Icon/Icon.js';
import {Headline} from 'Components/Headline/Headline.js';
import {Hint} from 'Components/Hint/Hint.js';
import {Pagination} from 'Components/Pagination/Pagination.js';

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

        this.info = new Hint({
            headline: 'Подсказка!',
            content: 'Здесь будет находиться подсказка',
            id: 'hint',
            classname: 'hidden-element',
        }).render();
        this.outer.appendChild(this.info);
    }

    renderBaseHeader(nameOfPage = '') {
        this.forHeader.appendChild(new Icon({
            src: '/static/icons/back.png',
            id: 'back',
            handler: () => {
                router.back();
            }
        }).render());

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/home.png',
            id: 'home',
            handler: () => {
                router.go('menu');
            }
        }).render());

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/info.png',
            id: 'info',
            handler: () => {
                this.showInfo();
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

    showInfo () {
        const hint = document.getElementById('hint');
        hint.classList.contains('hidden-element') ?
            hint.classList.remove('hidden-element') :
            hint.classList.add('hidden-element');
    }
}
