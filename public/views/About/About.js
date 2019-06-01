'use strict';

import {Page} from 'Views/Page.js';
import {AboutPreview} from 'Components/AboutPreview/AboutPreview.js';


export class About extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('О проекте');

        /* имя, описание */
        const persons = { 
            'Наш проект на github': '',
            'Зайцев Дмитрий' : 'Ментор проекта',
            'Чуриков Сергей': 'backend',
            'Смехунов Алексей': 'frontend',
            'Атасунц Владимир': 'backend',
            'Никифорова Ирина':  'frontend',
        };

        /*имя аватарки, ник на гитхабе */
        const avatars = ['project', 'HaseProgram', 'sergeychur', 'Sighr', 'Tsaanstu', 'gleensande']
        const niks = [
            'frontend-park-mail-ru/2019_1_newTeam2',
            'HaseProgram',
            'sergeychur',
            'Sighr',
            'Tsaanstu',
            'gleensande',
        ];

        let aboutPreviews = [];

        Object.entries(persons).forEach( (name, i) => {
            aboutPreviews[i] = new AboutPreview ({
                name: name[1],
                description: name[0]
            }).render(avatars[i], niks[i]);
        });

        aboutPreviews.forEach( link => {
            this.forContent.appendChild(link);
            this.forContent.appendChild(document.createElement('br'));
        });
    }
}
