'use strict';

const profileTemplate = require('Templates/Profile.pug');
const profileeditTemplate = require('Templates/ProfileEdit.pug');

import {Page} from 'Views/Page.js';
import {Button} from 'Components/Button/Button.js';

import {baseUrl} from 'Services/ajax.js';
import bus from 'Services/bus.js';

export class Profile extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Мой профиль');

        let forButton = document.createElement('div');
        this.outer.appendChild(forButton);

        let edit = new Button({type: 'secondary', name: 'Редактировать'}).render();
        forButton.appendChild(edit);

        edit.addEventListener('click', () => {
            edit.firstChild.classList.add('hidden-element');
            save.firstChild.classList.remove('hidden-element');
            this.forContent.innerHTML = profileeditTemplate(this._user);
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
            this.forContent.innerHTML = profileTemplate(this._user);
        });
        save.firstChild.classList.add('hidden-element');

        this.listeners = new Set([
            ['self-loaded', this._onuserloaded],
        ]);
        super.subscribeAll();
    }

    _onuserloaded(data) {
        data.baseUrl = baseUrl;
        this._user = data;
        if (!this._user.path) {
            this._user.path = '/static/avatar-default.png';
        }
        this.forContent.innerHTML = profileTemplate(this._user);
    }
}