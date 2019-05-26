import {Controller} from 'Controllers/Controller.js';
import {Chat} from 'Views/Chat/Chat.js';
import {UserModel} from 'Models/UserModel.js';
import auth from 'Models/AuthModel.js';
import bus from 'Services/bus.js';
import {chatWebSocket} from 'Services/chatWebSocket.js';

export class ChatController extends Controller {
    index() {
        this.ws = new chatWebSocket();
        this.view = new Chat();
        auth.isAuthorised();
        
        this.listeners = new Set ([
            ['logged-in', this._onloggedin],
            ['logged-out', this._onloggedout],
            ['ws-message-received', this._onmessagereceived],
            ['message-form-submitted', this._onmessageformsubmitted],
        ]);

        super.subscribeAll();
    }

    _onmessageformsubmitted(text) {
        this.ws.send({message: text});
    }

    _onloggedin() {
        this.view.render({authorised: true, ws: this.ws});
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
                        return;
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
