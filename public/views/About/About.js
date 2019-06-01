'use strict';

import {Page} from 'Views/Page.js';
import {Link} from 'Components/Link/Link.js';
//import {Headline} from 'Components/Headline/Headline.js';


export class About extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('О проекте');

        const repository = new Link({
            size: '', 
            name: 'Наш проект на github',
            handler: () => {
                window.open('https://github.com/frontend-park-mail-ru/2019_1_newTeam2');
            }
        }).render();
        this.forContent.appendChild(repository);
    }
}
