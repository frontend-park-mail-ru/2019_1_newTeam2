import {Controller} from '/controllers/Controller.js';
import {Multiplayer} from "/views/Multiplayer/Multiplayer.js";
import bus from "/services/bus.js";

export class MultiplayerController extends Controller {
	index() {
		this.view = new Multiplayer();
		this.view.render();

		this.listeners = new Set ([
			['game-message-received', this._ongamemessagereceived],
		]);

		super.subscribeAll();
	}

	_ongamemessagereceived(data) {
		switch(data.type) {
			case "Leaderboard":
				bus.emit('game-leaderboard-update', data);
				break;
			case "Task":
				bus.emit('game-new-task', data);
				break;
		}
	}
}