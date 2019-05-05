'use strict';

import {Page} from '/views/Page.js';
import {Input} from '/components/Input/Input.js';
import {Link} from '/components/Link/Link.js';
import {Button} from '/components/Button/Button.js';

import router from '/services/router.js';
import bus from '/services/bus.js';

export class Login extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Авторизация');

        this.serverErrorText = document.createElement('div');
        this.serverErrorText.classList.add('error-text');
        this.serverErrorText.classList.add('hidden-element');
        this.serverErrorText.innerText = 'Неправильный логин или пароль';

        this.loginTemplateText = document.createElement('div');
        this.loginTemplateText.classList.add('error-text');
        this.loginTemplateText.classList.add('hidden-element');
        this.loginTemplateText.innerText = 'Пожалуйста, используйте только строчные и прописные латинские буквы, цифры и знак подчеркивания';

        let login = new Input({type: 'text', label: 'Логин* ', id: 'login', maxlen: 20});

        this.passwordTemplateText = document.createElement('div');
        this.passwordTemplateText.classList.add('error-text');
        this.passwordTemplateText.classList.add('hidden-element');
        this.passwordTemplateText.innerText = 'Пожалуйста, используйте только строчные и прописные латинские буквы, цифры и знак подчеркивания';

        let password = new Input({ type: 'password', label: 'Пароль* ', id: 'password', maxlen: 20});

        let submit = new Button({type: 'secondary', name: 'Войти'});
        let signupLink = new Link({size: '', name: 'Нет аккаунта?'});
        
        let renderedSubmit = submit.render();
        let renderedSignupLink = signupLink.render();
        
        this.forContent.appendChild(this.serverErrorText);
        this.forContent.appendChild(this.loginTemplateText);
        this.forContent.appendChild(login.render());
        this.forContent.appendChild(this.passwordTemplateText);
        this.forContent.appendChild(password.render());
        this.forContent.appendChild(renderedSubmit);
        this.forContent.appendChild(renderedSignupLink);

        this.outer.addEventListener( 'keyup', (event) => {
            if(event.keyCode === 13){ // Enter button clicked
                renderedSubmit.click();
            }
        });

        renderedSubmit.addEventListener( 'click', () => {
            if (!this.serverErrorText.classList.contains('hidden-element')) {
                this.serverErrorText.classList.add('hidden-element');
            }

            if (!this.loginTemplateText.classList.contains('hidden-element')) {
                this.loginTemplateText.classList.add('hidden-element');
            }

            if (!this.passwordTemplateText.classList.contains('hidden-element')) {
                this.passwordTemplateText.classList.add('hidden-element');
            }         

            let loginText = document.getElementById('login').value;
            let passwordText = document.getElementById('password').value;

            let profile = {
                'username' : loginText,
                'password' : passwordText
            };

            bus.emit('login-form-submitted', profile);
        });
        
        renderedSignupLink.addEventListener( 'click', () => {
            router.go('signup');
        });
        
        this.listeners = new Set([
            ['wrong-login', this._onwronglogin],
            ['wrong-password', this._onwrongpassword],
            ['no-login', this._onnologin],
        ]);
        super.subscribeAll();
    }

    _onwronglogin() {
        this.loginTemplateText.classList.remove('hidden-element');
    }

    _onwrongpassword() {
        this.passwordTemplateText.classList.remove('hidden-element');
    }

    _onnologin() {
        this.serverErrorText.classList.remove('hidden-element');
    }

}