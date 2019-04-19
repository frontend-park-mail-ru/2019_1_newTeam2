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

        let cross = new Icon({
            src: '/static/cross.png',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'card-removed', this.id);
            }
        }).render();
        outer.appendChild(cross);

        outer.classList.add('card-preview');
        let word = new Headline({
            size: 'h2',
            textContent: this.word.name,
        }).render();
        outer.appendChild(word);

        let translation = new Headline({
            size: 'h2',
            textContent: this.translation.name,
        }).render();
        outer.appendChild(translation);


        return outer;
    }
}