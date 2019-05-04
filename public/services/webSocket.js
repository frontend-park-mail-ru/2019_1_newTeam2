import bus from '/services/bus.js';
import {UserModel} from "../models/UserModel.js";

// const chatUrl = 'newteam2back.herokuapp.com/'; // TODO(Deploy): change url for deploy
const chatUrl = 'localhost:8091/';

let ws;

export class WebSocketService {
    constructor() {
        const model = new UserModel();
        model.getSelf();
        bus.on('self-loaded', this._callback, this);
    }

    _callback(data) {
        bus.off('self-loaded', this._callback);
        if(!ws) {
            ws = new WebSocket(`ws://${chatUrl}chat/enter/${data.id}`);
            ws.addEventListener('open', () => {
                bus.emit('ws-opened');
            });

            ws.addEventListener('message', (event) => {
                const msg = JSON.parse(event.data);
                bus.emit('ws-message-received', msg);
            });
        }
    };

    send(data) {
        ws.send(JSON.stringify(data));
    }
}