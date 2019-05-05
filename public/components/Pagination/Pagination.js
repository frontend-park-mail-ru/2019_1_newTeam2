'use strict';

import {Button} from 'Components/Button/Button.js';
import bus from 'Services/bus.js';

export class Pagination {
    render(div) {
        const buttonPrev = new Button({
            type: 'square',
            name: '<',
            handler: () => {
                bus.emit('prev-page');
            }
        }).render();
        const buttonNext = new Button({
            type: 'square',
            name: '>',
            handler: () => {
                bus.emit('next-page');
            }
        }).render();
        div.appendChild(buttonPrev);
        div.appendChild(buttonNext);
    }
}
