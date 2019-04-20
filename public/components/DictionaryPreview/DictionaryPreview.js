'use strict';

import {Headline} from '/components/Headline/Headline.js';
import {Image} from '/components/Image/Image.js';
import {Icon} from '/components/Icon/Icon.js';
import {Link} from '/components/Link/Link.js';
import bus from '/services/bus.js';
import router from '/services/router.js';

export class DictionaryPreview {
    constructor(dict) {
        this.id = dict.id;
        this.name = dict.name;
        this.description = dict.description;
    }

    render() {
        let outer = document.createElement('div');
        outer.classList.add('dictionary-preview');
        outer.id = this.id;

        let image = new Image({
            callback: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'dict-removed', this.id);
            },
            type: 'dictionary',
            src: '/static/dictionary-image.png'
        }).render();
        image.classList.add('dictionary-preview__image');
        outer.appendChild(image);

        let cross = new Icon({
            src: '/static/cross.png',
            classname: 'dictionary-preview__cross-icon',
            handler: () => {
                document.getElementById(this.id).classList.add('hidden-element');
                setTimeout(bus.emit.bind(bus), 0, 'dict-removed', this.id);
            }
        }).render();
        outer.appendChild(cross);

        let name = new Link({
            size: 'h1',
            name: this.name,
            classname: 'dictionary-preview__headline',
            handler: () => {
                router.go('dictionary/' + this.id);
            }
        }).render();
        outer.appendChild(name);

        let description = document.createElement('div');
        description.innerText = this.description;
        description.classList.add('dictionary-preview__description');

        outer.appendChild(description);


        return outer;
    }
}