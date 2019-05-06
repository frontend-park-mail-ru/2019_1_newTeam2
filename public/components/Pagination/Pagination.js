'use strict';

import {Icon} from 'Components/Icon/Icon.js';
import bus from 'Services/bus.js';

export class Pagination {
    render(div) {
        const buttonPrev = new Icon({
            src: '/static/left.png',
            handler: () => {
                bus.emit('prev-page');
            }
        }).render();
        const buttonNext = new Icon({
            src: '/static/right.png',
            handler: () => {
                bus.emit('next-page');
            }
        }).render();
        div.appendChild(buttonPrev);
        div.appendChild(buttonNext);
    }
}
