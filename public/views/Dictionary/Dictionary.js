'use strict';

import {Page} from 'Views/Page.js';
import {Icon} from 'Components/Icon/Icon.js';
import {Button} from 'Components/Button/Button.js';
import {Input} from 'Components/Input/Input.js';
import {DictionaryPreview} from 'Components/DictionaryPreview/DictionaryPreview.js';
import bus from 'Services/bus.js';


export class Dictionary extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Мои словари');
        super.renderBasePagination();
        
        const name = new Input({
            id: 'name',
            type: 'text',
            value: '',
            placeholder: 'Название словаря',
            maxlen: 50,
            label: '',
        }).render();
        name.classList.add('hidden-element');
        this.forHeader.appendChild(name);

        const description = new Input({
            id: 'description',
            type: 'text',
            value: '',
            placeholder: 'Описание словаря',
            maxlen: 50,
            label: '',
        }).render();
        description.classList.add('hidden-element');
        this.forHeader.appendChild(description);
		
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
                document.getElementById('name').value = '';
                dict.description = document.getElementById('description').value;
                document.getElementById('description').value = '';
                bus.emit('new-dict-form-submitted', dict);
            }
        }).render();
        this.forHeader.appendChild(submit);

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
        this.forHeader.appendChild(deny);

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
        this.forHeader.appendChild(plus);

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