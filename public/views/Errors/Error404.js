'use strict';

import {Page} from 'Views/Page.js';
import {Image} from 'Components/Image/Image.js';

export class Error404 extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('К сожалению, такой страницы не существует');

        let img = document.createElement('img');
        img.src ='/static/404/404sunflowers.png';
        img.style.height = '200px';
        this.forContent.appendChild(img);
    }
}