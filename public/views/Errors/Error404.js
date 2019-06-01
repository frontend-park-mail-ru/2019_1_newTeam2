'use strict';

import {Page} from 'Views/Page.js';
import {Image} from 'Components/Image/Image.js';

export class Error404 extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('К сожалению, такой страницы не существует');

        let img = new Image({
            type: 'error',
            src: '/static/404/404sunrise.png',
        }).render();
        this.forContent.appendChild(img);
    }
}