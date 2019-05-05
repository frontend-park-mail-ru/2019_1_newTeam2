import bus from 'Services/bus.js';

// const chatUrl = 'newteam2back.herokuapp.com/'; // TODO(Deploy): change url for deploy
const chatUrl = 'localhost:8091/';

let ws;

export class WebSocketService {
    constructor() {
        if(!ws) {
            ws = new WebSocket(`ws://${chatUrl}chat/enter/1`);
            ws.addEventListener('open', () => {
                bus.emit('ws-opened');
            });

            ws.addEventListener('message', (event) => {
                const msg = JSON.parse(event.data);
                bus.emit('ws-message-received', msg);
            });
        }
    }

    send(data) {
        ws.send(JSON.stringify(data));
    }
}