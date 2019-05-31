'use strict';

import {Icon} from 'Components/Icon/Icon.js';
import bus from 'Services/bus.js';

export class Pagination {
    render(div) {
        const buttonPrev = new Icon({
            src: '/static/icons/left.png',
            handler: () => {
                bus.emit('prev-page');
            }
        }).render();
        const buttonNext = new Icon({
            src: '/static/icons/right.png',
            handler: () => {
                bus.emit('next-page');
            }
        }).render();
        div.appendChild(buttonPrev);
        div.appendChild(buttonNext);
    }
}
