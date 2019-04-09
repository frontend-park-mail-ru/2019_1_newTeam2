'use strict';

import {Headline} from '../../components/Headline/Headline.js';
import {Input} from '../../components/Input/Input.js';
import {Link} from '../../components/Link/Link.js';
import {Button} from '../../components/Button/Button.js';

import router from '../../services/router.js';
import bus from '../../services/bus.js';

const application = document.getElementById('application');

export class Login {
    render(options = {}) {
        application.innerText = '';
        const outer = document.createElement('div');
        outer.classList.add('centered');
        application.appendChild(outer);

        let headline = new Headline({size: 'h1', textContent: 'Авторизация'});
        let serverErrorText = document.createElement('div');
        serverErrorText.classList.add('error-text');
        serverErrorText.classList.add('hidden-element');
        serverErrorText.innerText = 'Неправильный логин или пароль';


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

        outer.addEventListener( 'keyup', (event) => {
            if(event.keyCode === 13){ // Enter button clicked
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

            let profile = {
                "username" : loginText,
                "password" : passwordText
            };

            setTimeout(bus.emit.bind(bus), 0 , 'form-submitted', profile);
        });
        this._onwronglogin = () => {
            loginTemplateText.classList.remove('hidden-element')
        };
        this._onwrongpassword = () => {
            passwordTemplateText.classList.remove('hidden-element')
        };
        this._onnologin = () => {
            serverErrorText.classList.remove('hidden-element')
        };
        bus.on('wrong-login', this._onwronglogin);
        bus.on('wrong-password', this._onwrongpassword);
        bus.on('no-login', this._onnologin);
        renderedSignupLink.addEventListener( 'click', () => {
            router.go('signup');
        });
    }

    preventAllEvents() {
        bus.off('no-login', this._onnologin);
        bus.off('wrong-login', this._onwronglogin);
        bus.off('wrong-password', this._onwrongpassword);
    }
}