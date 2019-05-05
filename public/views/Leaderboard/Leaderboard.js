'use strict';

import {Page} from 'Views/Page.js';
import {Table} from 'Components/Table/Table.js';

export class Leaderboard extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Лидеры');
        super.renderBasePagination();

        this.table = new Table();
        
        this.listeners = new Set([
            ['users-loaded', this._onload],
        ]);
        super.subscribeAll();
    }

    _onload(data) {
        this.table.data = data;
        let childNode = this.forContent.firstChild;
        if(!childNode) {
            this.forContent.appendChild(this.table.render());
        }
        else {
            childNode = this.table.render();
        }
    }
}