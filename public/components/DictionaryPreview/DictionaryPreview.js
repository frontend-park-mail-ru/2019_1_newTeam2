'use strict';

import {GriseMerde} from "/components/GriseMerde/GriseMerde.js";
import {Headline} from "/components/Headline/Headline.js";
import {Icon} from "/components/Icon/Icon.js";
import bus from "/services/bus.js";

export class DictionaryPreview {
    constructor(dict) {
        this.id = dict.id;
        this.name = dict.name;
        this.description = dict.description;
    }

    render() {
        let inner = document.createElement("div");

        let cross = new Icon({
            src: '/static/cross.png',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'dict-removed', this.id)
            }
        }).render();
        inner.appendChild(cross);

        let name = new Headline({
            size: 'h1',
            textContent: this.name,
        }).render();
        inner.appendChild(name);

        let description = new Headline({
            size: 'h2',
            textContent: this.description,
        }).render();
        inner.appendChild(description);

        let outer = new GriseMerde({
            size: 'small',
            id: this.id,
            inner: inner,
        }).render();

        return outer;
    }
}