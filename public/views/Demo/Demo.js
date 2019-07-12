'use strict';

import {Page} from 'Views/Page.js';
import {Headline} from 'Components/Headline/Headline.js';
import router from 'Services/router.js';
import {Variant} from 'Components/Variant/Variant.js';
import {Button} from 'Components/Button/Button.js';

export class Demo extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Тренировка');
        const hintString = 'Здесь вы можете потренировать свой английский без смс и регистрации!';
        const hint = {
            headline: 'Пробная тренировка',
            content:  hintString,
            id: 'hint',
            classname: 'hidden-element',
        };
        super.renderHint(hint);

        this.listeners = new Set([
            ['demo-cards-loaded', this._ondemocardsloaded],
        ]);
        super.subscribeAll();
    }

    _ondemocardsloaded(cards) {
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
            }
        };

        const pageGenerator = function*() {
            for(let index = 0; index < cards.length; ++index) {
                const card = cards[index];
                const inner = document.createElement('div');

                const word = new Variant({
                    size: 'big',
                    inner: card.question
                }).render();
                inner.appendChild(word);
                card.words.forEach((variant) => {
                    const onchoose = () => {
                        if (variant === card.answer) {
                            result.push({correct: true});
                        } else {
                            result.push({correct: false});
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