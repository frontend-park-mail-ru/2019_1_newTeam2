'use strict';

import {Page} from 'Views/Page.js';
import {Button} from 'Components/Button/Button.js';

import router from 'Services/router.js';

const loginedButtonNames = {
    'training': 'Тренировка',
    'chat': 'Языковой чат',
    'dictionaries/me': 'Мои словари',
    'profile/me': 'Профиль',
    'leaderboard': 'Таблица лидеров',
    'login': 'Выйти'
};

const unloginedButtonNames = {
    'login': 'Войти',
    'leaderboard': 'Таблица лидеров',
    'signup': 'Зарегистрироваться'
};


export class Menu extends Page {
    render({authorised = false}) {
        super.renderBase();
        
        let buttons = [];

        const createButtons = (buttonNames) => {
            Object.entries(buttonNames).forEach( (name, i) => {
                buttons[i] = new Button ({type: 'primary', name: name[1]});
            });

            Object.entries(buttonNames).forEach( (name, i) => {
                buttons[i] = buttons[i].render();
                buttons[i].addEventListener('click', function () {        
                    router.go(name[0]);
                });
            });
        };

        if (authorised) {
            createButtons(loginedButtonNames);
        } else {
            createButtons(unloginedButtonNames);
        }
        
        buttons.forEach( button => {
            this.forContent.appendChild(button);
        });
    }
}