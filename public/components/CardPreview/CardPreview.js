'use strict';

import { Icon } from '/components/Icon/Icon.js';
import bus from '/services/bus.js';

export class CardPreview {
    constructor(card) {
        this.id = card.id;
        this.word = {};
        this.word.name = card.word.name;
        this.word.langID = card.word.langID;
        this.translation = {};
        this.translation.name = card.translation.name;
        this.translation.langID = card.translation.langID;
    }

    render() {
        let outer = document.createElement('div');
        outer.id = this.id;

        outer.classList.add('card-preview');

        let leftPart = document.createElement('div');
        leftPart.classList.add('card-preview_part_left');
        leftPart.innerText = this.word.name;
        outer.appendChild(leftPart);

        let rightPart = document.createElement('div');
        rightPart.classList.add('card-preview_part_right');
        rightPart.innerText = this.translation.name;
        outer.appendChild(rightPart);

        let cross = new Icon({
            src: '/static/cross.png',
            classname: 'card-preview__cross-icon',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                bus.emit('card-removed', this.id);
            }
        }).render();
        rightPart.appendChild(cross);

        return outer;
    }
}