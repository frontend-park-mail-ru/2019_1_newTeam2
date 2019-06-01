'use strict';

import {Page} from 'Views/Page.js';
import {Variant} from 'Components/Variant/Variant.js';
import {multiplayerWebSocket} from 'Services/multiplayerWebSocket.js';
import {Table} from 'Components/Table/Table.js';
import {Icon} from 'Components/Icon/Icon.js';
import {Headline} from 'Components/Headline/Headline.js';

import router from 'Services/router.js';

const application = document.getElementById('application');

export class Multiplayer extends Page {
    render() {
        super.renderBase();

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/back.png',
            id: 'back',
            handler: () => {
                this.ws.destroy();
                router.back();
            }
        }).render());


        this.forHeader.appendChild(new Icon({
            src: '/static/icons/home.png',
            id: 'home',
            handler: () => {
                this.ws.destroy();
                router.go('menu');
            }
        }).render());

        this.forHeader.appendChild(new Headline({
            textContent: 'Мультиплеер',
        }).render());

        const hintString = `Посоревнуйтесь в знаниях со своими друзьями!\n
        Угадывайте слова на скорость\n`;
        const hint = {
            headline: 'Мультиплеер',
            content:  hintString,
            id: 'hint',
            classname: 'hidden-element',
        };
        super.renderHint(hint);

        this.ws = new multiplayerWebSocket();

        this.forTask = document.createElement('div');
        this.forWord = document.createElement('div');
        this.forVariants = document.createElement('div');
        this.forLeadBoard = document.createElement('div');

        this.table = new Table();
        this.table.fields = ['Ник', 'Очки'];

        this.forContent.classList.add('playground');
        this.forVariants.classList.add('playground');

        this.failText = document.createElement('div');
        this.failText.classList.add('game-fail-text');
        this.failText.classList.add('hidden-element');
        this.failText.innerText = 'Неверно. Подождите...';

        this.forContent.appendChild(this.forTask);
        this.forTask.appendChild(this.forWord);
        this.forTask.appendChild(document.createElement('br'));
        this.forTask.appendChild(document.createElement('br'));
        this.forTask.appendChild(this.forVariants);
        this.forContent.appendChild(this.forLeadBoard);
        application.appendChild(this.failText);

        this.listeners = new Set([
            ['game-leaderboard-update', this._ongameleaderboardupdate],
            ['game-new-task', this._ongamenewtask],
        ]);
        super.subscribeAll();
    }

    _ongameleaderboardupdate(data) {
        this.forLeadBoard.innerText = '';
        data.payload.players.sort((l, r) => {
            return l.score < r.score ?  true : l.score > r.score ? false : l.username < r.username;
        });
        this.table.data = data.payload.players;
        this.forLeadBoard.appendChild(this.table.render());
    }

    _ongamenewtask(data) {
        this.forWord.innerText = '';
        this.forVariants.innerText = '';

        this.forWord.appendChild(new Variant(
            {
                size: 'big',
                inner: data.payload.question
            }).render()
        );
        data.payload.words.forEach((word) => {
            const merde = new Variant(
                {
                    size: 'small',
                    inner: word
                }).render();
            merde.addEventListener('click', () => {
                const answer = data.payload.answer;
                this.ws.send({
                    type: 'ANSWER',
                    payload: word
                });
                if(word !== answer) {
                    this.forContent.classList.add('hidden-element');
                    this.failText.classList.remove('hidden-element');
                    setTimeout(() => {
                        this.failText.classList.add('hidden-element');
                        this.forContent.classList.remove('hidden-element');
                    }, 3000);
                }
            });
            this.forVariants.appendChild(merde);
        });
    }
}