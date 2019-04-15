'use strict';

import {Headline} from "/components/Headline/Headline.js";

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
        outer.classList.add('card-preview');
        let word = new Headline ({
            size: 'h2',
            textContent: this.word.name,
        }).render();
        outer.appendChild(word);
        let translation = new Headline ({
            size: 'h2',
            textContent: this.translation.name,
        }).render();
        outer.appendChild(translation);
        return outer;
    }
}