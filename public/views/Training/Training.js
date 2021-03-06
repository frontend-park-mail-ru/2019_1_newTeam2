'use strict';

import {Page} from 'Views/Page.js';
import {Headline} from 'Components/Headline/Headline.js';
import router from 'Services/router.js';
import bus from 'Services/bus.js';
import {GriseMerde} from 'Components/GriseMerde/GriseMerde.js';
import {Button} from 'Components/Button/Button.js';
import {Pagination} from 'Components/Pagination/Pagination.js';

export class Training extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Тренировка');

        this.forContent.classList.add('training-outer');

        this.listeners = new Set([
            ['dicts-loaded', this._ondictsloaded],
            ['game-cards-loaded', this._ongamecardsloaded],
        ]);
        super.subscribeAll();
    }

    _ondictsloaded(dicts) {
        this.forContent.innerText = '';
        dicts.forEach((dict) => {
            const merde = new GriseMerde({
                size: 'small',
                inner: dict.name,
            }).render();
            merde.addEventListener('click', () => {
                bus.emit('dict-selected', dict.id);
            });
            this.forContent.appendChild(merde);
        });
        const pagination = new Pagination();
        pagination.render(this.forContent);
    }

    _ongamecardsloaded(cards) {
        let result = [];

        const genNextPage = () => {
            let page = pageGenerator.next();
            if (!page.done) {
                this.forContent.innerText = '';
                this.forContent.appendChild(page.value);
            } else {
                this.forContent.innerText = '';
                let guessedRight = 0;
                result.forEach((item) => {
                    if(item.correct) {
                        ++guessedRight;
                    }
                });
                const head = new Headline({
                    textContent: 'Ваш результат: ' + guessedRight + '/' + cards.length,
                    size: 'h3',
                }).render();
                this.forContent.appendChild(head);
                const menuButton = new Button({
                    type: 'secondary',
                    name: 'Вернуться в меню',
                    handler: () => {
                        router.go('menu');
                    }
                }).render();
                this.forContent.appendChild(menuButton);
                bus.emit('training-finished', result);
            }
        };

        const pageGenerator = function*() {
            // TODO(Alex): extract to component
            for(let index = 0; index < cards.length; ++index) {
                const card = cards[index];
                const inner = document.createElement('div');

                const word = new GriseMerde({
                    size: 'big',
                    inner: card.word
                }).render();
                inner.appendChild(word);
                card.variants.forEach((variant, index) => {
                    const onchoose = () => {
                        if (index === card.correct) {
                            result.push({correct: true, id: card.id});
                        } else {
                            result.push({correct: false, id: card.id});
                        }
                        genNextPage();
                    };

                    const choice = new GriseMerde({
                        size: 'small',
                        inner: variant + ' ', /* TODO(gleensande): fix this */
                    }).render();
                    choice.addEventListener('click', onchoose);
                    inner.appendChild(choice);
                });

                yield inner;
            }
        }();
        genNextPage();
    }
}