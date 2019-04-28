import bus from '/services/bus.js';
import {UserModel} from "../models/UserModel.js";

//const chatUrl = 'newteam2back.herokuapp.com/'; // TODO(Deploy): change url for deploy
const chatUrl = 'localhost:8091/';

const model = new UserModel();
model.getSelf();


class WebSocketService {
    constructor() {
        bus.on('user-loaded', this._callback, this);
    }

    _callback(data) {
        bus.off('user-loaded', this._callback);
        this.ws = new WebSocket(`ws://${chatUrl}chat/enter/${data.id}`);
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