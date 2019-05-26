import bus from 'Services/bus.js';

const chatUrl = 'new-words.ru/world_chat/';

let ws;

export class chatWebSocket {
    constructor() {
        if(!ws) {
            ws = new WebSocket(`ws://${chatUrl}chat/enter`);
            ws.addEventListener('open', () => {
                bus.emit('ws-opened');
            });

            ws.addEventListener('message', (event) => {
                const msg = JSON.parse(event.data);
                bus.emit('ws-message-received', msg);
            });
        }
        else {
            bus.emit('ws-opened');
        }
    }

    send(data) {
        ws.send(JSON.stringify(data));
    }

    destroy() {
        ws.close();
        ws = false;
    }
}