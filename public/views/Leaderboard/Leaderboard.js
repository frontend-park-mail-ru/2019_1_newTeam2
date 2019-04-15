'use strict';

import router from "/services/router.js";
import {Headline} from "/components/Headline/Headline.js";
import {Pagination} from "/components/pagination.js";
import {Table} from "/components/Table/Table.js";
import {Icon} from "/components/Icon/Icon.js";
import bus from "/services/bus.js";

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

        const forTable = document.createElement('div');
        const forPagination = document.createElement('div');
        outer.appendChild(forTable);
        outer.appendChild(forPagination);

        const table = new Table();
        this._onload = (data) => {
            console.log(data);
            table.data = data;
            let childNode = forTable.firstChild;
            if(!childNode)
                forTable.appendChild(table.render());
            else
                childNode = table.render();
        };
        bus.on('users-loaded', this._onload);

        const pagination = new Pagination();
        pagination.render(forPagination);
    }

    preventAllEvents() {
        bus.off('users-loaded', this._onload);
    }
}