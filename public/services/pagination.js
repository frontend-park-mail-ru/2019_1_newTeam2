'use strict';

import {Button} from "../components/Button/Button.js";
import bus from "./bus.js";



export class Pagination {
    render(div) {
        const buttonPrev = new Button({
            size: 'pagination',
            name: '<',
            handler: () => {
                bus.emit('prev-page');
            }
        }).render();
        const buttonNext = new Button({
            size: 'pagination',
            name: '>',
            handler: () => {
                bus.emit('next-page');
            }
        }).render();
        div.appendChild(buttonPrev);
        div.appendChild(buttonNext);
    }
}
