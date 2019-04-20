'use strict';

import router from '/services/router.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';
import {Input} from '/components/Input/Input.js';
import {CardPreview} from '/components/CardPreview/CardPreview.js';
import bus from '/services/bus.js';
import {Pagination} from "/components/pagination.js";

const application = document.getElementById('application');

export class Card {
    render() {
        application.innerHTML = '';
        const forHeader = document.createElement('div');
        const forContent = document.createElement('div');
        const forPagination = document.createElement('div');

        forHeader.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

        this._ondictloaded = (dict) => {
            const head1 = new Headline({textContent: dict.name}).render();
            forHeader.appendChild(head1);
			
            const head2 = new Headline({size: 'h2', textContent: dict.description}).render();
            forHeader.appendChild(head2);

            const word = new Input({
                id: 'word',
                type: 'text',
                value: '',
                placeholder: 'Слово (русский)',
                maxlen: 50,
                label: '',
            }).render();
            word.classList.add('hidden-element');
            forHeader.appendChild(word);
	
            const translation = new Input({
                id: 'translation',
                type: 'text',
                value: '',
                placeholder: 'Перевод (английский)',
                maxlen: 50,
                label: '',
            }).render();
            translation.classList.add('hidden-element');
            forHeader.appendChild(translation);
			
            const submit = new Button({
                type: 'secondary',
                name: 'Сохранить',
                id: 'submit',
                is_hidden: 'hidden-element',
                handler: () => {
                    document.getElementById('submit').classList.add('hidden-element');
                    document.getElementById('deny').classList.add('hidden-element');
                    word.classList.add('hidden-element');
                    translation.classList.add('hidden-element');
                    document.getElementById('plus').classList.remove('hidden-element');
                    let card = {
                        'id': 0,
                        'word': {
                            'name': document.getElementById('word').value,
                            'langID': 1
                        },
                        'translation': {
                            'name': document.getElementById('translation').value,
                            'langID': 2
                        }
                    };
                    setTimeout(bus.emit.bind(bus), 0, 'new-card-form-submitted', card);
                }
            }).render();
            forHeader.appendChild(submit);
	
            let deny = new Icon({
                src: '/static/cross.png',
                id: 'deny',
                classname: 'hidden-element',
                handler: () => {
                    document.getElementById('submit').classList.add('hidden-element');
                    document.getElementById('deny').classList.add('hidden-element');
                    word.classList.add('hidden-element');
                    translation.classList.add('hidden-element');
                    document.getElementById('plus').classList.remove('hidden-element');
                    let dict = {};
                    dict.word = document.getElementById('word').value;
                    dict.translation = document.getElementById('translation').value;
                }
            }).render();
            forHeader.appendChild(deny);
	
            let plus = new Icon({
                src: '/static/plus.png',
                id: 'plus',
                handler: () => {
                    document.getElementById('plus').classList.add('hidden-element');
                    document.getElementById('deny').classList.remove('hidden-element');
                    word.classList.remove('hidden-element');
                    translation.classList.remove('hidden-element');
                    document.getElementById('submit').classList.remove('hidden-element');
                }
            }).render();
            forHeader.appendChild(plus);

            let limiter = document.createElement('br');
            forHeader.appendChild(limiter);
	
        };

        this._oncardsloaded = (cards) => {
            forContent.innerText = '';
            cards.forEach((card)=> {
                let cardComponent = new CardPreview(card).render();
                forContent.appendChild(cardComponent);
            });
        };

        this._oncardloaded = () => {

        };

        this._onloadcarderror = () => {

        };

        this._oncardcreated = () => {

        };

        this._oncreatecarderror = () => {

        };

        this._oncardupdated = () => {

        };

        this._onupdatecarderror = () => {

        };

        this._ondeletecarderror = () => {

        };

        const pagination = new Pagination();
        pagination.render(forPagination);

        application.appendChild(forHeader);
        application.appendChild(forContent);
        application.appendChild(forPagination);

        bus.on('dict-loaded', this._ondictloaded);
        bus.on('load-dict-error', this._onloaddicterror);
        bus.on('cards-loaded', this._oncardsloaded);
        bus.on('card-loaded', this._oncardloaded);
        bus.on('load-card-error', this._onloadcarderror);
        bus.on('card-created', this._oncardcreated);
        bus.on('create-card-error', this._oncreatecarderror);
        bus.on('card-updated', this._oncardupdated);
        bus.on('update-card-error', this._onupdatecarderror);
        bus.on('delete-card-error', this._ondeletecarderror);
    }

    preventAllEvents() {
        bus.off('dict-loaded', this._ondictloaded);
        bus.off('load-dict-error', this._onloaddicterror);
        bus.off('cards-loaded', this._oncardsloaded);
        bus.off('card-loaded', this._oncardloaded);
        bus.off('load-card-error', this._onloadcarderror);
        bus.off('card-created', this._oncardcreated);
        bus.off('create-card-error', this._oncreatecarderror);
        bus.off('card-updated', this._oncardupdated);
        bus.off('update-card-error', this._onupdatecarderror);
        bus.off('delete-card-error', this._ondeletecarderror);
    }
}