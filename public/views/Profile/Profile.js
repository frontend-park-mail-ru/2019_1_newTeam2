'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';

import router from '/services/router.js';
import {baseUrl} from '/services/ajax.js';
import bus from '/services/bus.js';

const application = document.getElementById('application');

export class Profile extends View {
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


        this.forData = document.createElement('div');
        let forButton = document.createElement('div');

        outer.appendChild(this.forData);
        outer.appendChild(forButton);


        let edit = new Button({type: 'secondary', name: 'Редактировать'}).render();
        forButton.appendChild(edit);

        edit.addEventListener('click', () => {
            edit.firstChild.classList.add('hidden-element');
            save.firstChild.classList.remove('hidden-element');
            this.forData.innerHTML = profileeditTemplate(this._user);
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
            bus.emit('edit-user', this._user);
            const fileUpload = document.getElementsByName('file')[0];
            if(fileUpload.value) {
                bus.emit('user-upload-avatar', fileUpload.files[0]);
            }
            this.forData.innerHTML = profileTemplate(this._user);
        });
        save.firstChild.classList.add('hidden-element');

        this.listeners = new Set([
            ['user-loaded', this._onuserloaded],
        ]);
        super.subscribeAll();
    }

    _onuserloaded(data) {
        data.baseUrl = baseUrl;
        this._user = data;
        if (!this._user.path) {
            this._user.path = '/static/avatar-default.png';
        } else {
            this._user.path = this._user.baseUrl + this._user.path;
        }
        this.forData.innerHTML = profileTemplate(this._user);
    }
}