import ajax from 'Services/ajax.js';
import bus from 'Services/bus.js';


export class ChatHistory {
	constructor() {
		this.url = 'world_chat/chat/history';
	}

	getCardsByDictId({page = 1} = {page: 1}) {
		const rows = 20;
		ajax.doGet({
			path: this.url + `?&rows=${rows}&page=${page}`
		})
			.then((res) => {
				res.json()
					.then((res) => {
						bus.emit('history-loaded', res);
					})
			})
	}
}