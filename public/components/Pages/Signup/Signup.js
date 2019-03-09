'use strict';

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';


export class Signup {
    render() {
        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let headline = new Headline({size: 'h1', textContent: 'Регистрация'});

        let errorText = document.createElement('div');
        errorText.classList.add('error-text');
        errorText.classList.add('hidden-element');

        let login = new Input({type: 'text', label: 'Логин', id: 'login'});
        let password = new Input({ type: 'password', label: 'Пароль', id: 'password'});
        let email = new Input({ type: 'email', label: '@mail', id: 'email'});

        let loginLink = new Link({size: 'h4', name: 'Уже есть аккаунт?'});
        let submit = new Button({size: 'small', name: 'Зарегистрироваться'});
        
        let renderedSubmit = submit.render();
        let renderedLoginLink = loginLink.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(errorText);
        outer.appendChild(login.render());
        outer.appendChild(email.render());
        outer.appendChild(password.render());
        outer.appendChild(renderedLoginLink);
        outer.appendChild(renderedSubmit);

        let ajax = new AjaxModule();

        const application = document.getElementById('application');
        const rendererSignup = new RenderModule();

        renderedSubmit.addEventListener( 'click', () => {
            let profile = {
                "login" : document.getElementById('login').value,
                "email" : document.getElementById('email').value,
                "password" : document.getElementById('password').value,
                "langId" : 0, // по умолчанию
                "pronounceOn" : 0
            };
    
            console.log(profile);

            ajax.doPost({
                path: '/signup',
                body: profile
            })
            .then ((response) => {
                rendererSignup.render(application, 'menu');
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
            
        renderedLoginLink.addEventListener( 'click', () => {
            rendererSignup.render(application, 'login');
        });

		return outer;
    }
}
