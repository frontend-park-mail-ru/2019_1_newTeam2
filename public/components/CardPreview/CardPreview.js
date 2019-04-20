'use strict';

import { Headline } from '/components/Headline/Headline.js';
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
        let word = document.createTextNode(this.word.name + ' / ');
        outer.appendChild(word);

        let translation = document.createTextNode(this.translation.name);
        outer.appendChild(translation);

        let cross = new Icon({
            src: '/static/cross.png',
            classname: 'card-preview__cross-icon',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'card-removed', this.id);
            }
        }).render();
        outer.appendChild(cross);

        return outer;
    }
}