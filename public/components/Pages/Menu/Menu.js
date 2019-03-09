'use strict';

import {Button} from '../../Button/Button.js';

import {RenderModule} from '../../../modules/render.js';

const application = document.getElementById('application');

let buttonNames = {
    train: 'Тренировка',
    dictionaries:  'Мои словари',
    feed: 'Лента',
    profile: 'Профиль',
    login: 'Выйти'
}; 

export class Menu {
    render() {
        const rendererMenu = new RenderModule();

        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let buttons = [];

        Object.entries(buttonNames).forEach( (name, i) => {
            buttons[i] = new Button ({name: name[1], size: 'big'});
        });

        Object.entries(buttonNames).forEach( (name, i) => {
            buttons[i] = buttons[i].render();
            buttons[i].addEventListener('click', function () {        
                rendererMenu.render(application, name[0]);
            });
        });
        
        buttons.forEach( item => {
            outer.appendChild(item);
        });

		return outer;
    }   
}

