'use strict';

import {View} from '/views/View.js';
import {Icon} from '/components/Icon/Icon.js';
import router from '/services/router.js';
import {GriseMerde} from '/components/GriseMerde/GriseMerde.js';
import {multiplayerWebSocket} from "/services/multiplayerWebSocket.js";
import {Table} from "/components/Table/Table.js";

const application = document.getElementById('application');

export class Multiplayer extends View {
	render() {
		application.innerText = '';

		application.appendChild(new Icon({
			src: '/static/home-icon.png',
			handler: () => {
				this.ws.destroy();
				router.go('menu');
			}
		}).render());

		this.ws = new multiplayerWebSocket();

		this.outer = document.createElement('div');
		application.appendChild(this.outer);

		this.forTask = document.createElement('div');
		this.forVariants = document.createElement('div');
		this.forLeadBoard = document.createElement('div');

		this.table = new Table();
		this.table.fields = ['Ник', 'Очки'];

		this.outer.appendChild(this.forTask);
		this.outer.appendChild(this.forVariants);
		this.outer.appendChild(this.forLeadBoard);

		this.listeners = new Set([
			['game-leaderboard-update', this._ongameleaderboardupdate],
			['game-new-task', this._ongamenewtask],
		]);
		super.subscribeAll();
	}

	_ongameleaderboardupdate(data) {
		this.table.data = data.payload.players;
		this.forLeadBoard = this.table.render();
	}

	_ongamenewtask(data) {
		this.forTask.innerText = '';
		this.forVariants.innerText = '';

		this.forTask.appendChild(new GriseMerde(
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
				this.ws.send({
					type: "ANSWER",
					payload: word
				});
				if(word !== data.payload.answer)
					this.outer.classList.add('hidden-element');
					setTimeout(() => {
						this.outer.classList.remove('hidden-element');
					}, 3000);
			});
			this.forVariants.appendChild(merde);
		});
	}
}