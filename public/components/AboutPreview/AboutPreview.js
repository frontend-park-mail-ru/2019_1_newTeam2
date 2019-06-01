'use strict';

import {Image} from 'Components/Image/Image.js';
import {Link} from 'Components/Link/Link.js';

export class AboutPreview {
    constructor(person) {
        this.name = person.name;
        this.description = person.description;
    }

    render(srcImage = '', nickGithub = '') {
        let outer = document.createElement('div');
        outer.classList.add('about-preview');
        outer.id = this.id;

        let image = new Image({
            callback: () => {
                window.open('https://github.com/' + nickGithub);
            },
            type: 'dictionary',
            src: '/static/about/' + srcImage + '.jpeg',
        }).render();
        outer.appendChild(image);

        let name = new Link({
            size: 'h1',
            name: this.name,
            classname: 'about-preview__headline',
            handler: () => {
                window.open('https://github.com/' + nickGithub);
            }
        }).render();
        outer.appendChild(name);

        let description = document.createElement('div');
        description.innerText = this.description;
        description.classList.add('about-preview__description');

        outer.appendChild(description);


        return outer;
    }
}