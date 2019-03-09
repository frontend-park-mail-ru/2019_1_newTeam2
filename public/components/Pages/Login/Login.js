'use strict'

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';

export class Login {
    render() {
        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let headline = new Headline({size: 'h1', textContent: 'Авторизация'});

        let login = new Input();
        let password = new Input({ type: 'password'});

        let signUpLink = new Link({name: 'Уже есть аккаунт?'});
        let submit = new Button({size: 'small', name: 'Войти'});
        
        outer.appendChild(headline.render());
        outer.appendChild(login.render());
        outer.appendChild(password.render());
        outer.appendChild(signUpLink.render());
        outer.appendChild(submit.render());

		return outer;
    }
}