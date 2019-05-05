'use strict';

import {Image} from 'Components/Image/Image.js';
import {Icon} from 'Components/Icon/Icon.js';
import {Link} from 'Components/Link/Link.js';
import bus from 'Services/bus.js';
import router from 'Services/router.js';

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
                router.go('dictionary/' + this.id);
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
                bus.emit('dict-removed', this.id);
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