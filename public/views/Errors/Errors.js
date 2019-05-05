'use strict';

import {Page} from '/views/Page.js';

export class Error extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('К сожалению, возникла ошибка');
        super.renderBasePagination();
    }
}