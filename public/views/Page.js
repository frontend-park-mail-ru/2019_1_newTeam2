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
        this.hasHint = false;
    }

    renderHint(hint) {
        this.hasHint = true;
        this.info = new Hint(hint).render();
        this.outer.insertBefore(this.info, this.forHeader);

        document.getElementById('hint-icon').classList.remove('hidden-element');

        document.getElementById('hint_close').addEventListener('click', () => {
            this.closeInfo();
        });
    }

    renderBaseHeader(nameOfPage = '') {
        this.forHeader.appendChild(new Icon({
            src: '/static/icons/back.png',
            id: 'back',
            handler: () => {
                if (this.hasHint) {
                    this.closeInfo();
                }
                router.back();
            }
        }).render());

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/home.png',
            id: 'home',
            handler: () => {
                if (this.hasHint) {
                    this.closeInfo();
                }
                router.go('menu');
            }
        }).render());

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/info.png',
            id: 'hint-icon',
            classname: 'hidden-element',
            handler: () => {
                this.openOrCloseInfo();
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

    openOrCloseInfo() {
        const hint = document.getElementById('hint');
        if (hint.classList.contains('hidden-element')) {
            hint.classList.remove('hidden-element');
        } else {
            hint.classList.add('hidden-element');
        }
    }

    openInfo() {
        const hint = document.getElementById('hint');
        if (hint.classList.contains('hidden-element')) {
            hint.classList.remove('hidden-element');
        }
    }

    closeInfo() {
        const hint = document.getElementById('hint');
        if (!hint.classList.contains('hidden-element')) {
            hint.classList.add('hidden-element');
        }
    }
}
