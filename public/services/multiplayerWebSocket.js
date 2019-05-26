import bus from 'Services/bus.js';

const gameUrl = 'new-words.ru/';


export class multiplayerWebSocket {
    constructor() {
        this.ws = new WebSocket(`wss://${gameUrl}game`);
        this.ws.addEventListener('open', () => {
            bus.emit('game-ws-opened');
        });

        this.ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            bus.emit('game-message-received', msg);
        });
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    destroy() {
        this.ws.close();
    }
}