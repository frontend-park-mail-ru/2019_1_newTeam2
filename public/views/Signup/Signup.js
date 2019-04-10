'use strict';

import {Headline} from '../../components/Headline/Headline.js';
import {Input} from '../../components/Input/Input.js';
import {Link} from '../../components/Link/Link.js';
import {Button} from '../../components/Button/Button.js';

import router from '../../services/router.js';
import bus from "../../services/bus.js";

const application = document.getElementById('application');

export class Signup {
    render(options = {}) {
        application.innerHTML = '';
        const outer = document.createElement('div');
        outer.classList.add('centered');
        application.appendChild(outer);
        
        let headline = new Headline({size: 'h1', textContent: 'Регистрация'});

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

        let emailTemplateText = document.createElement('div');
        emailTemplateText.classList.add('error-text');
        emailTemplateText.classList.add('hidden-element');
        emailTemplateText.innerText = 'Email-адрес';

        let email = new Input({ type: 'email', label: 'Email* ', id: 'email', maxlen: 50});
        
        let submit = new Button({size: 'small', name: 'Зарегистрироваться'});
        let loginLink = new Link({size: 'h4', name: 'Уже есть аккаунт?'});
                
        let renderedSubmit = submit.render();
        let renderedLoginLink = loginLink.render();
        
        outer.appendChild(headline.render());
        outer.appendChild(serverErrorText);
        outer.appendChild(loginTemplateText);
        outer.appendChild(login.render());
        outer.appendChild(emailTemplateText);
        outer.appendChild(email.render());
        outer.appendChild(passwordTemplateText);
        outer.appendChild(password.render());
        outer.appendChild(renderedSubmit);
        outer.appendChild(renderedLoginLink);

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
            
            if (!emailTemplateText.classList.contains('hidden-element')) {
                emailTemplateText.classList.add('hidden-element');
            }

            let profile = {
                "username" : document.getElementById('login').value,
                "email" : document.getElementById('email').value,
                "password" : document.getElementById('password').value,
                "langID" : 0, // по умолчанию
                "pronounceOn" : 0 // по умолчанию
            };

            setTimeout(bus.emit.bind(bus), 0, 'signup-form-submitted', profile);
        });
        this._onwronglogin = () => {
            loginTemplateText.classList.remove('hidden-element')
        };
        this._onwrongpassword = () => {
            passwordTemplateText.classList.remove('hidden-element')
        };
        this._onwrongemail = () => {
            emailTemplateText.classList.remove('hidden-element')
        };
        this._oncreateusererror = () => {
            serverErrorText.classList.remove('hidden-element')
        };

        bus.on('wrong-login', this._onwronglogin);
        bus.on('wrong-password', this._onwrongpassword);
        bus.on('wrong-email', this._onwrongemail);
        bus.on('create-user-error', this._oncreateusererror);

        renderedLoginLink.addEventListener( 'click', () => {
            router.go('login');
        });
    }

    preventAllEvents() {
        bus.off('create-user-error', this._oncreateusererror);
        bus.off('wrong-login', this._onwronglogin);
        bus.off('wrong-password', this._onwrongpassword);
        bus.off('wrong-email', this._onwrongemail);
    }
}
