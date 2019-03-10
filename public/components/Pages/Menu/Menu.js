'use strict';

import {Button} from '../../Button/Button.js';

import {RenderModule} from '../../../modules/render.js';
import {AuthModule} from '../../../modules/auth.js';


const application = document.getElementById('application');

let loginedButtonNames = {
    //train: 'Тренировка',
    dictionaries: 'Мои словари',
    //feed: 'Лента',
    profile: 'Профиль',
    leaderboard: 'Таблица лидеров'
};

let unloginedButtonNames = {
    //trainSample: 'Пробная тренировка',
    login: 'Войти',
    leaderboard: 'Таблица лидеров'
};


export class Menu {
    render() {
        const rendererMenu = new RenderModule();

        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let buttons = [];

        const createButtons = (buttonNames) => {
            Object.entries(buttonNames).forEach( (name, i) => {
                buttons[i] = new Button ({name: name[1], size: 'big'});
            });

            Object.entries(buttonNames).forEach( (name, i) => {
                buttons[i] = buttons[i].render();
                buttons[i].addEventListener('click', function () {        
                    rendererMenu.render(application, name[0]);
                });
            });
        };

        let auth = new AuthModule();
        if (auth.isAuthorised()) {
            createButtons(loginedButtonNames);
        } else {
            createButtons(unloginedButtonNames);
        }
        
        buttons.forEach( item => {
            outer.appendChild(item);
        });

		return outer;
    }   
}

