'use strict';

import router from "../../services/router.js";
import {Headline} from "../../components/Headline/Headline.js";
import {Pagination} from "../../services/pagination.js";
import {Table} from "../../components/Table/Table.js";
import {Icon} from "../../components/Icon/Icon.js";
import {Button} from "../../components/Button/Button.js";
import {AuthModule} from '../../services/auth.js';
import bus from "../../services/bus.js";

export class Leaderboard {
    render(options = {}) {
        let outer = application;
        outer.innerHTML = '';

        const head = new Headline({textContent: 'Лидеры'}).render();
        outer.appendChild(head);

        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                let auth = new AuthModule();
                let options = {
                    logined: false
                };
                auth.isAuthorised()
                .then( (res) => {
                    if (res.status === 200) {
                        options['logined'] = true;
                    }
                    router.go('menu', options);
                });
            }
        }).render());

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