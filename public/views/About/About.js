'use strict';

import {Page} from 'Views/Page.js';
import {Link} from 'Components/Link/Link.js';
//import {Headline} from 'Components/Headline/Headline.js';


export class About extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('О проекте');

        new Link({size: '', name: 'Наш проект на github'});
    }
}
