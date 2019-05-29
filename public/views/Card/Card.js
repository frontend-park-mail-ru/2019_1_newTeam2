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
        super.renderBasePagination();

        this.listeners = new Set([
            ['dict-loaded', this._ondictloaded],
            ['cards-loaded',this._oncardsloaded],
            ['card-loaded', this._oncardloaded],
            ['load-card-error', this._onloadcarderror],
            ['card-created', this._oncardcreated],
            ['create-card-error', this._oncreatecarderror],
            ['card-updated', this._oncardupdated],
            ['update-card-error', this._onupdatecarderror],
            ['delete-card-error', this._ondeletecarderror],
            ['wrong-word', this._onwrongword],
            ['wrong-translation', this._onwrongtranslation],
        ]);
        super.subscribeAll();
    }

    _ondictloaded(dict) {
        super.renderBaseHeader('Словарь: ' + dict.name);
        
        const head2 = new Headline({size: 'h2', textContent: dict.description}).render();
        this.forHeader.appendChild(head2);

        this.word = new Input({
            id: 'word',
            type: 'text',
            value: '',
            placeholder: 'Слово (русский)',
            maxlen: 50,
            label: '',
        }).render();
        this.word.classList.add('hidden-element');
        this.forHeader.appendChild(this.word);

        this.translation = new Input({
            id: 'translation',
            type: 'text',
            value: '',
            placeholder: 'Перевод (английский)',
            maxlen: 50,
            label: '',
        }).render();
        this.translation.classList.add('hidden-element');
        this.forHeader.appendChild(this.translation);
        
        const submit = new Button({
            type: 'secondary',
            name: 'Сохранить',
            id: 'submit',
            is_hidden: 'hidden-element',
            handler: () => {
                const card = {
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
                bus.emit('new-card-form-submitted', card);
            }
        }).render();
        this.forHeader.appendChild(submit);

        const deny = new Icon({
            src: '/static/cross.png',
            id: 'deny',
            classname: 'hidden-element',
            handler: () => {
                document.getElementById('submit').classList.add('hidden-element');
                document.getElementById('deny').classList.add('hidden-element');
                this.word.classList.add('hidden-element');
                this.translation.classList.add('hidden-element');
                document.getElementById('plus').classList.remove('hidden-element');
                let dict = {};
                dict.word = document.getElementById('word').value;
                dict.translation = document.getElementById('translation').value;
            }
        }).render();
        this.forHeader.appendChild(deny);

        const plus = new Icon({
            src: '/static/plus.png',
            id: 'plus',
            handler: () => {
                document.getElementById('plus').classList.add('hidden-element');
                document.getElementById('deny').classList.remove('hidden-element');
                this.word.classList.remove('hidden-element');
                this.translation.classList.remove('hidden-element');
                document.getElementById('submit').classList.remove('hidden-element');
            }
        }).render();
        this.forHeader.appendChild(plus);

        const limiter = document.createElement('br');
        this.forHeader.appendChild(limiter);
    }
        
    _oncardsloaded(cards) {
        this.forContent.innerText = '';
        cards.forEach((card)=> {
            const cardComponent = new CardPreview(card).render();
            this.forContent.appendChild(cardComponent);
        });
    }

    _oncardcreated(card) {
        const cardComponent = new CardPreview(card).render();
        this.forContent.appendChild(cardComponent);
    }

    _onwrongword(word) {
        document.getElementById('word').classList.add('input_error');
    }

    _onwrongtranslation(word) {
        document.getElementById('translation').classList.add('input_error');
    }
}