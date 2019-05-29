'use strict';

import {Page} from 'Views/Page.js';
import {GriseMerde} from 'Components/GriseMerde/GriseMerde.js';
import {multiplayerWebSocket} from 'Services/multiplayerWebSocket.js';
import {Table} from 'Components/Table/Table.js';

const application = document.getElementById('application');

export class Multiplayer extends Page {
    render() {
        super.renderBase();
        super.renderBaseHeader('Мультиплеер');
        this.ws = new multiplayerWebSocket();

        this.forTask = document.createElement('div');
        this.forWord = document.createElement('div');
        this.forVariants = document.createElement('div');
        this.forLeadBoard = document.createElement('div');

        this.table = new Table();
        this.table.fields = ['Ник', 'Очки'];

        this.forContent.classList.add('game');
        this.forVariants.classList.add('game');


        this.failText = document.createElement('div');
        this.failText.classList.add('game-fail-text');
        this.failText.classList.add('hidden-element');
        this.failText.innerText = 'неправильно';

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

        this.forWord.appendChild(new GriseMerde(
            {
                size: 'big',
                inner: data.payload.question
            }).render()
        );
        data.payload.words.forEach((word) => {
            const merde = new GriseMerde(
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