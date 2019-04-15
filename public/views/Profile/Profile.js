'use strict';

import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';

import router from '/services/router.js';
import {baseUrl} from '/services/ajax.js';
import bus from '/services/bus.js';

const application = document.getElementById('application');

export class Profile{
    render() {
        const outer = application;
        outer.innerHTML = '';

        let headline = new Headline({size: 'h1', textContent: 'Мой профиль'});

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline.render());


        let forData = document.createElement('div');
        let forButton = document.createElement('div');

        outer.appendChild(forData);
        outer.appendChild(forButton);

        this._onuserloaded = (data) => {
            data.baseUrl = baseUrl;
            this._user = data;
            console.log(this._user.path);
            if (!this._user.path) {
                this._user.path = '/static/avatar-default.png';
            } else {
                this._user.path = this._user.baseUrl + this._user.path;
            }
            forData.innerHTML = profileTemplate(this._user);
        };

        bus.on('user-loaded', this._onuserloaded);

        let edit = new Button({type: 'secondary', name: 'Редактировать'}).render();
        forButton.appendChild(edit);

        edit.addEventListener('click', () => {
            edit.firstChild.classList.add('hidden-element');
            save.firstChild.classList.remove('hidden-element');
            forData.innerHTML = profileeditTemplate(this._user);
        });

        let save = new Button({type: 'secondary', name: 'Сохранить'}).render();
        forButton.appendChild(save);

        save.addEventListener('click', () => {
            edit.firstChild.classList.remove('hidden-element');
            save.firstChild.classList.add('hidden-element');
            const inputs = document.getElementsByTagName('input');
            Array.from(inputs).forEach(
                (input) => {
                    if (input.name === 'file') {
                        return;
                    }
                    this._user[`${input.name}`] = input.value;
                }
            );
            setTimeout(bus.emit.bind(bus), 0, 'edit-user', this._user);
            const fileUpload = document.getElementsByName('file')[0];
            if(fileUpload.value) {
                setTimeout(bus.emit.bind(bus), 0, 'user-upload-avatar', fileUpload.files[0]);
            }
            forData.innerHTML = profileTemplate(this._user);
        });
        save.firstChild.classList.add('hidden-element');
    }

    preventAllEvents() {
        bus.off('user-loaded', this._onuserloaded);
    }
}