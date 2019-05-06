import bus from 'Services/bus.js';

// const chatUrl = 'newteam2back.herokuapp.com/'; // TODO(Deploy): change url for deploy
const chatUrl = 'new-words.ru/';

let ws;

export class chatWebSocket {
    constructor() {
        if(!ws) {
            ws = new WebSocket(`ws://${chatUrl}chat/`);
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