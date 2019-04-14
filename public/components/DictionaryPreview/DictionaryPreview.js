'use strict';

import {Headline} from "/components/Headline/Headline.js";
import {Icon} from "/components/Icon/Icon.js";
import bus from "/services/bus.js";
import router from "/services/router.js";

export class DictionaryPreview {
    constructor(dict) {
        this.id = dict.id;
        this.name = dict.name;
        this.description = dict.description;
    }

    render() {
        let outer = document.createElement("div");
        outer.classList.add("grise-merde");
        outer.classList.add("grise-merde_size_small");
        outer.classList.add("dictionary-preview");
        outer.id = this.id;

        outer.addEventListener('click', () => {
            const id = this.id;
            router.go('dictionary/' + id);
        });
        
        let cross = new Icon({
            src: '/static/cross.png',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'dict-removed', this.id)
            }
        }).render();
        outer.appendChild(cross);

        let name = new Headline({
            size: 'h1',
            textContent: this.name,
        }).render();
        outer.appendChild(name);

        let description = new Headline({
            size: 'h2',
            textContent: this.description,
        }).render();
        outer.appendChild(description);


        return outer;
    }
}