'use strict';

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';


export class Login {
    render() {
        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let headline = new Headline({size: 'h1', textContent: 'Авторизация'});
        let errorText = document.createElement('div');
        errorText.classList.add('error-text');
        errorText.classList.add('hidden-element');


        let login = new Input({type: 'text', label: 'Логин', id: 'login'});
        let password = new Input({ type: 'password', label: 'Пароль', id: 'password'});

        let signupLink = new Link({size: 'h4', name: 'Нет аккаунта?'});
        let submit = new Button({size: 'small', name: 'Войти'});

        let renderedSubmit = submit.render();
        let renderedSignupLink = signupLink.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(errorText);
        outer.appendChild(login.render());
        outer.appendChild(password.render());
        outer.appendChild(renderedSignupLink);
        outer.appendChild(renderedSubmit);

        let ajax = new AjaxModule();

        const application = document.getElementById('application');
        const rendererLogin = new RenderModule();

        renderedSubmit.addEventListener( 'click', () => {
            let profile = {
                "login" : document.getElementById('login').value,
                "password" : document.getElementById('password').value
            }
    
            ajax.doPost({
                path: '/login',
                body: profile
            })
            .then ((response) => {
                rendererLogin.render(application, 'menu');
            })
            .catch ((error) => {
                console.log(error.response);
                error.response.json()
                .then ((res) => {
                    errorText.innerText = res['error'];
                    errorText.classList.remove('hidden-element');
                });
            });

        });

        renderedSignupLink.addEventListener( 'click', () => {
            rendererLogin.render(application, 'signup');
        });
            
		return outer;
    }
}