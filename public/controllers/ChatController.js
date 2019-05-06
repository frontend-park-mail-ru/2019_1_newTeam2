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
            ['user-loaded', this._onuserloaded],
            ['message-form-submitted', this._onmessageformsubmitted],
        ]);

        super.subscribeAll();

        this.model = new UserModel();
        this.model.getSelf();
    }

    _onuserloaded(data) {
        this.selfid = data.id;
    }

    _onmessageformsubmitted(text) {
        this.ws.send({message: text});
    }

    _onloggedin() {
        this.view.render({authorised: true});
    }
    
    _onloggedout() {
        this.view.render({authorised: false});
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
