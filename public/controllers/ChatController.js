import {Controller} from '/controllers/Controller.js';
import {Chat} from '/views/Chat/Chat.js';
import {UserModel} from '/models/UserModel.js';
import auth from '/models/AuthModel.js';
import bus from '/services/bus.js';

export class ChatController extends Controller {
    index() {
        this.view = new Chat();
        auth.isAuthorised();
        
        this.listeners = new Set ([
            ['logged-in', this._onloggedin],
            ['logged-out', this._onloggedout],
            ['ws-message-received', this._onmessagereceived],
        ]);

        super.subscribeAll();

        this.model = new UserModel();
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
        bus.emit('name-got');
    }
}