'use strict';

import router from "Services/router.js";

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

            const changeFunc = (event) => {
                const files = event.target.files;
                if(files && files.length) {
                    bus.emit('user-upload-avatar', files[0]);
                }

                if (FileReader) {
                    const fr = new FileReader();
                    fr.onload = () => {
                        document.getElementById('avatar').src = fr.result;
                    };
                    fr.readAsDataURL(files[0]);
                }
                else {
                    router.go('profile/me')
                }
            };
            document.getElementById('file').onchange = changeFunc;
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