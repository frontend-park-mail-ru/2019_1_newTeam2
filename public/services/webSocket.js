import bus from '/services/bus.js';

const chatUrl = 'localhost:8091/'; // TODO(Deploy): change url for deploy

class WebSocketService {
    constructor() {
        this.ws = new WebSocket(`ws://${chatUrl}chat/enter/`);
        this.ws.addEventListener('open', () => {
            bus.emit('ws-opened');
        });

        this.ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            bus.emit('ws-message-received', msg);
        });
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}

export default new WebSocketService();