import {Controller} from 'Controllers/Controller.js';
import {Chat} from 'Views/Chat/Chat.js';
import auth from 'Models/AuthModel.js';
import bus from 'Services/bus.js';
import {chatWebSocket} from 'Services/chatWebSocket.js';
import {ChatHistory} from 'Models/ChatHistory.js';

export class ChatController extends Controller {
    index() {
        this.model = new ChatHistory();
        this.ws = new chatWebSocket();
        this.view = new Chat();
        this.page = 1;
        auth.isAuthorised();
        
        this.listeners = new Set ([
            ['logged-in', this._onloggedin],
            ['get-history', this._ongethistory],
            ['logged-out', this._onloggedout],
            ['ws-message-received', this._onmessagereceived],
            ['message-form-submitted', this._onmessageformsubmitted],
            ['no-more-history', this._onnomorehistory],
        ]);

        super.subscribeAll();
    }

    _onnomorehistory() {
        this.stopGetHist = true;
    }

    _onmessageformsubmitted(text) {
        this.ws.send({message: text});
    }

    _onloggedin() {
        this.view.render({authorised: true, ws: this.ws});
    }

    _ongethistory() {
        if(this.stopGetHist) {
            return;
        }
        this.model.getChatHistory({page: this.page});
        this.page++;
    }
    
    _onloggedout() {
        this.view.render({authorised: false, ws: this.ws});
    }

    _notify(data) {
        if (!('Notification' in window)) {
            console.error('notifications not supported');
            return;
        }

        if (Notification.permission === 'granted') {
            new Notification(data);
            return;
        }

        if (Notification.permission !== 'denied') {
            Notification
                .requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        new Notification(data);
                    }
                });
        }
    }

    _onmessagereceived(data) {
        if(document.hidden) {
            this._notify(data.message);
        }
        bus.emit('name-got', data);
    }
}
