'use strict';

import {Page} from 'Views/Page.js';
import {Link} from 'Components/Link/Link.js';
//import {Headline} from 'Components/Headline/Headline.js';


export class About extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('О проекте');

        const links = {
            'Наш проект на github': 'https://github.com/frontend-park-mail-ru/2019_1_newTeam2',
            'Зайцев Дмитрий (наш ментор)' : 'https://github.com/HaseProgram',
            'Чуриков Сергей (backend)': 'https://github.com/sergeychur',
            'Смехунов Алексей (frontend)': 'https://github.com/Sighr',
            'Атасунц Владимир (backend)': 'https://github.com/Tsaanstu',
            'Никифорова Ирина (frontend)': 'https://github.com/gleensande',
        };

        let renderedLinks = [];

        Object.entries(links).forEach( (name, i) => {
            renderedLinks[i] = new Link ({
                size: 'h1', 
                name: name[0],
                handler: () => {
                    window.open(name[1]);
                }
            }).render();
        });

        renderedLinks.forEach( link => {
            this.forContent.appendChild(link);
            this.forContent.appendChild(document.createElement('br'));
        });
    }
}
