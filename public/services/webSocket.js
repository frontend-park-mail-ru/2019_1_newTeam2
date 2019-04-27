import bus from '/services/bus.js';
import {UserModel} from "../models/UserModel.js";

const chatUrl = 'localhost:8091/'; // TODO(Deploy): change url for deploy

const model = new UserModel();
model.getSelf();


class WebSocketService {
    constructor() {
        bus.on('user-loaded', this._callback);
    }

    _callback(data) {
        bus.off('user-loaded', this._callback);
        this.ws = new WebSocket(`ws://${chatUrl}chat/enter/${this.id}`);
        this.ws.addEventListener('open', () => {
            bus.emit('ws-opened');
        });

        this.ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            bus.emit('ws-message-received', msg);
        });
    };

    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}

export default new WebSocketService();