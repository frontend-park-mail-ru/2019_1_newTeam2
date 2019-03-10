'use strict';

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';
import {CookieModule} from '../../../modules/cookie.js'; // REMOVE IT
import {AuthModule} from '../../../modules/auth.js';

export class Login {
    render() {
        let authLogin = new AuthModule();
        authLogin.logout();

        const outer = document.createElement('div');
        outer.classList.add('centered');
        
        let headline = new Headline({size: 'h1', textContent: 'Авторизация'});
        let serverErrorText = document.createElement('div');
        serverErrorText.classList.add('error-text');
        serverErrorText.classList.add('hidden-element');

        let loginTemplateText = document.createElement('div');
        loginTemplateText.classList.add('error-text');
        loginTemplateText.classList.add('hidden-element');
        loginTemplateText.innerText = 'Строчные и прописные латинские буквы, цифры, _';

        let login = new Input({type: 'text', label: 'Логин* ', id: 'login', maxlen: 20});

        let passwordTemplateText = document.createElement('div');
        passwordTemplateText.classList.add('error-text');
        passwordTemplateText.classList.add('hidden-element');
        passwordTemplateText.innerText = 'Строчные и прописные латинские буквы, цифры, _';

        let password = new Input({ type: 'password', label: 'Пароль* ', id: 'password', maxlen: 20});

        let submit = new Button({size: 'small', name: 'Войти'});
        let signupLink = new Link({size: 'h4', name: 'Нет аккаунта?'});
        
        let renderedSubmit = submit.render();
        let renderedSignupLink = signupLink.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(serverErrorText);
        outer.appendChild(loginTemplateText);
        outer.appendChild(login.render());
        outer.appendChild(passwordTemplateText);
        outer.appendChild(password.render());
        outer.appendChild(renderedSubmit);
        outer.appendChild(renderedSignupLink);

        let ajax = new AjaxModule();

        const application = document.getElementById('application');
        const rendererLogin = new RenderModule();

        outer.addEventListener( 'keyup', (event) => {
            if(event.keyCode === 13){
                renderedSubmit.click();
            }
        });

        renderedSubmit.addEventListener( 'click', () => {
             if (!serverErrorText.classList.contains('hidden-element')) {
                serverErrorText.classList.add('hidden-element');
            }

            if (!loginTemplateText.classList.contains('hidden-element')) {
                loginTemplateText.classList.add('hidden-element');
            }

            if (!passwordTemplateText.classList.contains('hidden-element')) {
                passwordTemplateText.classList.add('hidden-element');
            }         

            let loginText = document.getElementById('login').value;
            let passwordText = document.getElementById('password').value;
            
            let allFieldsValid = (() => {
                let isOk = true;
            
                const loginRegExpr = /^[a-zA-Z0-9-_]+$/;
                const passwordRegExpr = /^[a-zA-Z0-9-_]+$/;
                
        
                if (!loginRegExpr.test(loginText)) {
                    loginTemplateText.classList.remove('hidden-element');
                    isOk = false;
                }
            
                if (!passwordRegExpr.test(passwordText)) {
                    passwordTemplateText.classList.remove('hidden-element');
                    isOk = false;
                }
            
                return isOk;
            })();

            if (!allFieldsValid) {
                return;
            }

            let profile = {
                "username" : loginText,
                "password" : passwordText
            };
    
            ajax.doPost({
                path: '/login',
                body: profile
            })
            .then ((response) => {
                let cookieMod = new CookieModule(); // REMOVE IT
                cookieMod.setCookie('user_id',0,1); // REMOVE IT
                rendererLogin.render(application, 'menu');
            })
            .catch ((error) => {
                console.log(error.response);
                error.response.json()
                .then ((res) => {
                    serverErrorText.innerText = res['error'];
                    serverErrorText.classList.remove('hidden-element');
                });
            });

        });

        renderedSignupLink.addEventListener( 'click', () => {
            rendererLogin.render(application, 'signup');
        });
            
		return outer;
    }
}