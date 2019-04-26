'use strict';

import {View} from '/views/View.js';
import router from '/services/router.js';
import {Headline} from '/components/Headline/Headline.js';
import {Pagination} from '/components/pagination.js';
import {Table} from '/components/Table/Table.js';
import {Icon} from '/components/Icon/Icon.js';

const application = document.getElementById('application');

export class Leaderboard extends View {
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
        
        this.listeners = new Set([
            ['users-loaded', this._onload],
        ]);
        super.subscribeAll();
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

}