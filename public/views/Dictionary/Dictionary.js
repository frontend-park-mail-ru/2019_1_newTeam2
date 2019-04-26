'use strict';

import {View} from '/views/View.js';
import router from '/services/router.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';
import {Input} from '/components/Input/Input.js';
import {DictionaryPreview} from '/components/DictionaryPreview/DictionaryPreview.js';
import bus from '/services/bus.js';
import {Pagination} from '/components/pagination.js';

const application = document.getElementById('application');

export class Dictionary extends View {
    render() {
        application.innerHTML = '';
        this.forContent = document.createElement('div');
        this.forPagination = document.createElement('div');

        application.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

        application.appendChild(new Headline({
            textContent: 'Мои словари'
        }).render());

        const name = new Input({
            id: 'name',
            type: 'text',
            value: '',
            placeholder: 'Название словаря',
            maxlen: 50,
            label: '',
        }).render();
        name.classList.add('hidden-element');
        application.appendChild(name);

        const description = new Input({
            id: 'description',
            type: 'text',
            value: '',
            placeholder: 'Описание словаря',
            maxlen: 50,
            label: '',
        }).render();
        description.classList.add('hidden-element');
        application.appendChild(description);
		
        const submit = new Button({
            type: 'secondary',
            name: 'Сохранить',
            id: 'submit',
            is_hidden: 'hidden-element',
            handler: () => {
                document.getElementById('submit').classList.add('hidden-element');
                document.getElementById('deny').classList.add('hidden-element');
                name.classList.add('hidden-element');
                description.classList.add('hidden-element');
                document.getElementById('plus').classList.remove('hidden-element');
                let dict = {};
                dict.name = document.getElementById('name').value;
                dict.description = document.getElementById('description').value;
                bus.emit('new-dict-form-submitted', dict);
            }
        }).render();
        application.appendChild(submit);

        let deny = new Icon({
            src: '/static/cross.png',
            id: 'deny',
            classname: 'hidden-element',
            handler: () => {
                document.getElementById('submit').classList.add('hidden-element');
                document.getElementById('deny').classList.add('hidden-element');
                name.classList.add('hidden-element');
                description.classList.add('hidden-element');
                document.getElementById('plus').classList.remove('hidden-element');
                let dict = {};
                dict.name = document.getElementById('name').value;
                dict.description = document.getElementById('description').value;
            }
        }).render();
        application.appendChild(deny);

        let plus = new Icon({
            src: '/static/plus.png',
            id: 'plus',
            handler: () => {
                document.getElementById('plus').classList.add('hidden-element');
                document.getElementById('deny').classList.remove('hidden-element');
                name.classList.remove('hidden-element');
                description.classList.remove('hidden-element');
                document.getElementById('submit').classList.remove('hidden-element');
            }
        }).render();
        application.appendChild(plus);

        let limiter = document.createElement('br');
        application.appendChild(limiter);


        application.appendChild(this.forContent);
        application.appendChild(this.forPagination);


        const pagination = new Pagination();
        pagination.render(this.forPagination);

        this.listeners = new Set([
            ['dicts-loaded', this._ondictsloaded],
        ]);
        super.subscribeAll();
    }

    _ondictsloaded(dicts) {
        this.forContent.innerText = '';
        dicts.forEach((dict) => {
            let preview = new DictionaryPreview(dict).render();
            this.forContent.appendChild(preview);
        });
    }
}