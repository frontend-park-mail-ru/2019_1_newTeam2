'use strict';

import {View} from '/views/View.js';
import {Icon} from '/components/Icon/Icon.js';
import {Headline} from '/components/Headline/Headline.js';
import router from '/services/router.js';
import bus from '/services/bus.js';
import {Link} from '/components/Link/Link.js';
import {GriseMerde} from '/components/GriseMerde/GriseMerde.js';
import {Button} from '/components/Button/Button.js';
import {Pagination} from '/components/pagination.js';

const application = document.getElementById('application');

export class Training extends View {
    render() {
        application.innerText = '';

        application.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());


        this.outer = document.createElement('div');
        application.appendChild(this.outer);
        this.outer.classList.add('training-outer');

        this.listeners = new Set([
            ['dicts-loaded', this._ondictsloaded],
            ['game-cards-loaded', this._ongamecardsloaded],
        ]);
        super.subscribeAll();
    }

    _ondictsloaded(dicts) {
        this.outer.innerText = '';
        dicts.forEach((dict) => {
            const link = new Link({
                size: 'h2',
                name: dict.name,
                handler: () => {
                    bus.emit('dict-selected', dict.id);
                }
            }).render();
            this.outer.appendChild(link);
        });
        const pagination = new Pagination();
        pagination.render(this.outer);
    }

    _ongamecardsloaded(cards) {
        let result = [];

        const genNextPage = () => {
            let page = pageGenerator.next();
            if (!page.done) {
                this.outer.innerText = '';
                this.outer.appendChild(page.value);
            } else {
                this.outer.innerText = '';
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
                this.outer.appendChild(head);
                const menuButton = new Button({
                    type: 'secondary',
                    name: 'Вернуться в меню',
                    handler: () => {
                        router.go('menu');
                    }
                }).render();
                this.outer.appendChild(menuButton);
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

                    const choice = new Link({
                        size: 'h3',
                        name: variant + ' ', /* TODO(gleensande): fix this */
                        handler: onchoose
                    }).render();
                    inner.appendChild(choice);
                });

                yield inner;
            }
        }();
        genNextPage();
    }
}