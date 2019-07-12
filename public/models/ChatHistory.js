import ajax from 'Services/ajax.js';
import bus from 'Services/bus.js';
import {chatUrl} from 'Services/chatWebSocket.js';


export class ChatHistory {
    constructor() {
        this.url = 'chat/history';
    }

    getChatHistory({page = 1} = {page: 1}) {
        const rows = 20;
        ajax.doGet({
            path: this.url + `?&rows=${rows}&page=${page}`,
            base: 'https://' + chatUrl, //TODO(Deploy): https
        })
            .then((res) => {
                res.json()
                    .then((res) => {
                        bus.emit('history-loaded', res);
                    });
            });
    }
}