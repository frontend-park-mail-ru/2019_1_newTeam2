'use strict';

import {Headline} from '../../Headline/Headline.js';
import {Input} from '../../Input/Input.js';
import {Link} from '../../Link/Link.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';


export class Signup {
    render(options = {}) {
        const outer = document.createElement('div');
        outer.classList.add('centered');
        
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

        let ajax = new AjaxModule();

        const application = document.getElementById('application');
        const rendererSignup = new RenderModule();

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
            
            if (!emailTemplateText.classList.contains('hidden-element')) {
                emailTemplateText.classList.add('hidden-element');
            }  

            let loginText = document.getElementById('login').value;
            let passwordText = document.getElementById('password').value;
            let emailText = document.getElementById('email').value;
            
            let allFieldsValid = (() => {
                let isOk = true;
            
                const loginRegExpr = /^[a-zA-Z0-9-_]+$/;
                const passwordRegExpr = /^[a-zA-Z0-9-_]+$/;
                const emailRegExpr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
                if (!loginRegExpr.test(loginText) || loginText == '') {
                    loginTemplateText.classList.remove('hidden-element');
                    isOk = false;
                }
            
                if (!passwordRegExpr.test(passwordText) || passwordText == '') {
                    passwordTemplateText.classList.remove('hidden-element');
                    isOk = false;
                }

                if (!emailRegExpr.test(emailText) || emailText == '') {
                    emailTemplateText.classList.remove('hidden-element');
                    isOk = false;
                }
            
                return isOk;
            })();

            if (!allFieldsValid) {
                return;
            }



            let profile = {
                "username" : document.getElementById('login').value,
                "email" : document.getElementById('email').value,
                "password" : document.getElementById('password').value,
                "langID" : 0, // по умолчанию
                "pronounceOn" : 0 // по умолчанию
            };
    
            console.log(profile);

            ajax.doPost({
                // path: 'https://ancient-bastion-96223.herokuapp.com/signup/',
                path: '/signup/',
                body: profile
            })
            .then ((response) => {
                rendererSignup.render(application, 'menu', {logined: true});
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
            
        renderedLoginLink.addEventListener( 'click', () => {
            rendererSignup.render(application, 'login');
        });

		return outer;
    }
}
