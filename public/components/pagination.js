'use strict';

import {Button} from "./Button/Button.js";
import bus from "../services/bus.js";



export class Pagination {
    render(div) {
        const buttonPrev = new Button({
            type: 'square',
            name: '<',
            handler: () => {
                setTimeout(bus.emit.bind(bus), 0, 'prev-page');
            }
        }).render();
        const buttonNext = new Button({
            type: 'square',
            name: '>',
            handler: () => {
                setTimeout(bus.emit.bind(bus), 0, 'next-page');
            }
        }).render();
        div.appendChild(buttonPrev);
        div.appendChild(buttonNext);
    }
}
