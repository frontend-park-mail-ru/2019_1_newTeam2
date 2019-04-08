'use strict';

import {Button} from '../../components/Button/Button.js';

import router from '../../services/router.js';
import auth from '../../services/auth.js';

let loginedButtonNames = {
    //'train': 'Тренировка',
    'dictionaries/me': 'Мои словари',
    //'feed': 'Лента',
    'profile/me': 'Профиль',
    'leaderboard': 'Таблица лидеров',
    'login': 'Выйти'
};

let unloginedButtonNames = {
    //'trainSample': 'Пробная тренировка',
    'login': 'Войти',
    'leaderboard': 'Таблица лидеров'
};


export class Menu {
    render(options = {}) {
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
                    router.go(name[0]);
                });
            });
        };
        let DELETEth = auth.isAuthorised();
        console.log("i get:");
        console.log(DELETEth);
        if (DELETEth) {
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