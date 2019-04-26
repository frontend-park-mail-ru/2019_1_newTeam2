'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Input} from '/components/Input/Input.js';
import {Link} from '/components/Link/Link.js';
import {Button} from '/components/Button/Button.js';
import {Icon} from '/components/Icon/Icon.js';

import router from '/services/router.js';
import bus from '/services/bus.js';

const application = document.getElementById('application');

export class Signup extends View {
    render() {
        application.innerHTML = '';
        const outer = document.createElement('div');
        application.appendChild(outer);
        
        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

        let headline = new Headline({size: 'h1', textContent: 'Регистрация'});

        this.serverErrorText = document.createElement('div');
        this.serverErrorText.classList.add('error-text');
        this.serverErrorText.classList.add('hidden-element');

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

        this.emailTemplateText = document.createElement('div');
        this.emailTemplateText.classList.add('error-text');
        this.emailTemplateText.classList.add('hidden-element');
        this.emailTemplateText.innerText = 'Пожалуйста, введите валидный email-адрес, аналогичный example@mail.ru';

        let email = new Input({ type: 'email', label: 'Email* ', id: 'email', maxlen: 50});
        
        let submit = new Button({type: 'secondary', name: 'Зарегистрироваться'});
        let loginLink = new Link({size: '', name: 'Уже есть аккаунт?'});
                
        let renderedSubmit = submit.render();
        let renderedLoginLink = loginLink.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(this.serverErrorText);
        outer.appendChild(this.loginTemplateText);
        outer.appendChild(login.render());
        outer.appendChild(this.emailTemplateText);
        outer.appendChild(email.render());
        outer.appendChild(this.passwordTemplateText);
        outer.appendChild(password.render());
        outer.appendChild(renderedSubmit);
        outer.appendChild(renderedLoginLink);

        outer.addEventListener( 'keyup', (event) => {
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
            
            if (!this.emailTemplateText.classList.contains('hidden-element')) {
                this.emailTemplateText.classList.add('hidden-element');
            }

            let profile = {
                'username' : document.getElementById('login').value,
                'email' : document.getElementById('email').value,
                'password' : document.getElementById('password').value,
                'langID' : 1, // по умолчанию
                'pronounceOn' : 0 // по умолчанию
            };

            bus.emit('signup-form-submitted', profile);
        });
        
        renderedLoginLink.addEventListener( 'click', () => {
            router.go('login');
        });

        this.listeners = new Set([
            ['wrong-login', this._onwronglogin],
            ['wrong-password', this._onwrongpassword],
            ['wrong-email', this._onwrongemail],
            ['create-user-error', this._oncreateusererror],
        ]);
        super.subscribeAll();
    }

    _onwronglogin() {
        this.loginTemplateText.classList.remove('hidden-element');
    }

    _onwrongpassword() {
        this.passwordTemplateText.classList.remove('hidden-element');
    }

    _onwrongemail() {
        this.emailTemplateText.classList.remove('hidden-element');
    }

    _oncreateusererror() {
        this.serverErrorText.classList.remove('hidden-element');
    }
}
