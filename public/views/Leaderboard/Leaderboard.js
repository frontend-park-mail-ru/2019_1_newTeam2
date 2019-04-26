'use strict';

import router from '/services/router.js';
import {Headline} from '/components/Headline/Headline.js';
import {Pagination} from '/components/pagination.js';
import {Table} from '/components/Table/Table.js';
import {Icon} from '/components/Icon/Icon.js';
import bus from '/services/bus.js';

const application = document.getElementById('application');

export class Leaderboard {
    render() {
        let outer = application;
        outer.innerHTML = '';

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

        const head = new Headline({textContent: 'Лидеры'}).render();
        outer.appendChild(head);

        this.forTable = document.createElement('div');
        this.forPagination = document.createElement('div');
        outer.appendChild(this.forTable);
        outer.appendChild(this.forPagination);

        this.table = new Table();
        
        const pagination = new Pagination();
        pagination.render(this.forPagination);

        bus.on('users-loaded', this._onload, this);
    }

    _onload(data) {
        this.table.data = data;
        let childNode = this.forTable.firstChild;
        if(!childNode) {
            this.forTable.appendChild(this.table.render());
        }
        else
            childNode = this.table.render();
    }

    preventAllEvents() {
        bus.off('users-loaded', this._onload);
    }
}