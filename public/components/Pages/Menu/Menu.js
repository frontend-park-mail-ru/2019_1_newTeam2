'use strict'

import {Button} from '../../Button/Button.js';

// let buttons = {
//     train: Training,
//     dictis: Dictionaries,
//     feed: Feed,
//     profile: Profile
// }

export class Menu {
    render() {
        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let button = [];

        button[0] = new Button ({name: 'Тренировка', size: 'big'});
        button[1] = new Button ({name: 'Мои словари', size: 'big'});
        button[2] = new Button ({name: 'Лента', size: 'big'});
        button[3] = new Button ({name: 'Профиль', size: 'big'});

        button.forEach( item => {
            outer.appendChild(item.render());
        });

		return outer;
    }
    
    clickOnButton(name) {
        return (function () {
            // TODO(gleensande)
        });
    } 
}

