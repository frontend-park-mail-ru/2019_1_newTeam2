'use strict';

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';
import {Menu} from '../../Pages/Menu/Menu.js';

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

        let signUpLink = new Link({size: 'h4', name: 'Уже есть аккаунт?'});
        let submit = new Button({size: 'small', name: 'Войти'});
        
        let renderedSubmit = submit.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(errorText);
        outer.appendChild(login.render());
        outer.appendChild(password.render());
        outer.appendChild(signUpLink.render());
        outer.appendChild(renderedSubmit);

        let ajax = new AjaxModule();

        renderedSubmit.addEventListener( 'click', () => {
            let profile = {
                "login" : document.getElementById('login').value,
                "password" : document.getElementById('password').value
            }
    
            console.log(profile);
    
            const application = document.getElementById('application');
            const rendererLogin = new RenderModule();


            ajax.doPost({
                path: '/login',
                body: profile
            })
            .then ((response) => {
                rendererLogin.render(application, 'menu');
            })
            .catch ((error) => {
                console.log('Error occured here, it is: ');
                console.log(error.response);
                error.response.json()
                .then ((res) => {
                    errorText.innerText = res['error'];
                    errorText.classList.remove('hidden-element');
                    //let loginElement = document.getElementById('login');
                    //loginElement.parentNode.insertBefore(errorText, loginElement);
                });
            });

        });
            


		return outer;
    }
}
