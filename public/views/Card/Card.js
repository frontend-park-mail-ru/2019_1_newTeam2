'use strict';

import {Page} from 'Views/Page.js';
import {Headline} from 'Components/Headline/Headline.js';
import {Icon} from 'Components/Icon/Icon.js';
import {Button} from 'Components/Button/Button.js';
import {Input} from 'Components/Input/Input.js';
import {CardPreview} from 'Components/CardPreview/CardPreview.js';
import bus from 'Services/bus.js';


export class Card extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader();
        super.renderBasePagination();

        this.listeners = new Set([
            ['dict-loaded', this._ondictloaded],
            ['load-dict-error', this._onloaddicterror],
            ['cards-loaded',this._oncardsloaded],
            ['card-loaded', this._oncardloaded],
            ['load-card-error', this._onloadcarderror],
            ['card-created', this._oncardcreated],
            ['create-card-error', this._oncreatecarderror],
            ['card-updated', this._oncardupdated],
            ['update-card-error', this._onupdatecarderror],
            ['delete-card-error', this._ondeletecarderror],
        ]);
        super.subscribeAll();
    }

    _ondictloaded(dict) {
        const head1 = new Headline({textContent: dict.name}).render();
        this.forHeader.appendChild(head1);
        
        const head2 = new Headline({size: 'h2', textContent: dict.description}).render();
        this.forHeader.appendChild(head2);

        const word = new Input({
            id: 'word',
            type: 'text',
            value: '',
            placeholder: 'Слово (русский)',
            maxlen: 50,
            label: '',
        }).render();
        word.classList.add('hidden-element');
        this.forHeader.appendChild(word);

        const translation = new Input({
            id: 'translation',
            type: 'text',
            value: '',
            placeholder: 'Перевод (английский)',
            maxlen: 50,
            label: '',
        }).render();
        translation.classList.add('hidden-element');
        this.forHeader.appendChild(translation);
        
        const submit = new Button({
            type: 'secondary',
            name: 'Сохранить',
            id: 'submit',
            is_hidden: 'hidden-element',
            handler: () => {
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
                document.getElementById('word').value = '';
                document.getElementById('translation').value = '';
                bus.emit('new-card-form-submitted', card);
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
                word.classList.add('hidden-element');
                translation.classList.add('hidden-element');
                document.getElementById('plus').classList.remove('hidden-element');
                let dict = {};
                dict.word = document.getElementById('word').value;
                dict.translation = document.getElementById('translation').value;
            }
        }).render();
        this.forHeader.appendChild(deny);

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
        this.forHeader.appendChild(plus);

        let limiter = document.createElement('br');
        this.forHeader.appendChild(limiter);
    }
        
    _oncardsloaded(cards) {
        this.forContent.innerText = '';
        cards.forEach((card)=> {
            let cardComponent = new CardPreview(card).render();
            this.forContent.appendChild(cardComponent);
        });
    }

    _oncardloaded() {

    }

    _onloadcarderror() {

    }

    _oncardcreated() {

    }

    _oncreatecarderror() {

    }

    _oncardupdated() {

    }

    _onupdatecarderror() {

    }

    _ondeletecarderror() {

    }
}