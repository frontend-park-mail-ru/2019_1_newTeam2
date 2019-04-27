import {baseUrl} from '/services/ajax.js';
import bus from '/services/bus.js';

class WebSocketService {
	constructor() {
		this.ws = new WebSocket(`ws://${baseUrl}/chat/enter/`);
		this.ws.addEventListener('open', () => {
			bus.emit('ws-opened');
		});

		this.ws.addEventListener('message', (data) => {
			bus.emit('ws-message-received', data);
		});
	}

	send(data) {
		this.ws.send(data);
	}
}

export default new WebSocketService();