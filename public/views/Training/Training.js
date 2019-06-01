'use strict';

import {Page} from 'Views/Page.js';
import {Headline} from 'Components/Headline/Headline.js';
import router from 'Services/router.js';
import bus from 'Services/bus.js';
import {Variant} from 'Components/Variant/Variant.js';
import {Button} from 'Components/Button/Button.js';

export class Training extends Page {
    render() {
        this.hint = {
            headline: 'Тренировка',
            content: 'Здесь вы можете тренировать любые свои словари!',
            id: 'hint',
            classname: 'hidden-element',
        };
        super.renderBase();
        super.renderBaseHeader('Тренировка');
        super.renderBasePagination();

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
            const merde = new Variant({
                size: 'small',
                inner: dict.name,
            }).render();
            merde.addEventListener('click', () => {
                bus.emit('dict-selected', dict.id);
            });
            this.forContent.appendChild(merde);
        });
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

                const word = new Variant({
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

                    const choice = new Variant({
                        size: 'small',
                        inner: variant + ' ',
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