'use strict';

import {Page} from 'Views/Page.js';
import {AboutPreview} from 'Components/AboutPreview/AboutPreview.js';


export class About extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('О проекте');

        /* имя, описание */
        const persons = {
            'Наш github #1': 'backend',
            'Наш github #2': 'frontend',
            'Зайцев Дмитрий' : 'Ментор проекта',
            'Чуриков Сергей': 'backend',
            'Смехунов Алексей': 'frontend',
            'Атасунц Владимир': 'backend',
            'Никифорова Ирина':  'frontend',
        };

        /*имя аватарки, ник на гитхабе */
        //const avatars = ['project', 'HaseProgram', 'sergeychur', 'Sighr', 'Tsaanstu', 'gleensande']
        const avatars = [
            '/static/dictionary-image.png',
            '/static/dictionary-image.png',
            'https://avatars0.githubusercontent.com/u/5223992?s=400&v=4',
            'https://avatars3.githubusercontent.com/u/33199039?s=400&v=4',
            'https://avatars2.githubusercontent.com/u/25595104?s=400&v=4',
            'https://avatars3.githubusercontent.com/u/25965135?s=400&v=4',
            'https://avatars1.githubusercontent.com/u/26933306?s=460&v=4',

        ];
        const niks = [
            'frontend-park-mail-ru/2019_1_newTeam2',
            'go-park-mail-ru/2019_1_newTeam2',
            'HaseProgram',
            'sergeychur',
            'Sighr',
            'Tsaanstu',
            'gleensande',
        ];

        let aboutPreviews = [];

        Object.entries(persons).forEach( (name, i) => {
            aboutPreviews[i] = new AboutPreview ({
                name: name[0],
                description: name[1]
            }).render(avatars[i], niks[i]);
        });

        aboutPreviews.forEach( link => {
            this.forContent.appendChild(link);
            this.forContent.appendChild(document.createElement('br'));
        });
    }
}
