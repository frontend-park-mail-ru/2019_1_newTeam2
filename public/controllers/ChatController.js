import {Controller} from 'Controllers/Controller.js';
import {Chat} from 'Views/Chat/Chat.js';
import auth from 'Models/AuthModel.js';
import bus from 'Services/bus.js';
import {chatWebSocket} from 'Services/chatWebSocket.js';
import {ChatHistory} from 'Models/ChatHistory.js';
import {UserModel} from "Models/UserModel.js";

export class ChatController extends Controller {
    index() {
        this.userModel = new UserModel();
        this.view = new Chat();
        auth.isAuthorised();
        this.chatModel = new ChatHistory();
		this.page = 1;
        this.listeners = new Set ([
            ['logged-in', this._onloggedin],
            ['get-history', this._ongethistory],
            ['logged-out', this._onloggedout],
            ['ws-message-received', this._onmessagereceived],
            ['message-form-submitted', this._onmessageformsubmitted],
			['no-more-history', this._onnomorehistory],
            ['self-loaded', this._onuserloaded],
            ['ws-opened', this._onwsopened],
        ]);

        super.subscribeAll();
    }

    _onuserloaded(user) {
        this.view.render({authorised: this.authorised, user: user});
        this.ws = new chatWebSocket();
    }

    _onwsopened() {
        this.view.showInput(this.ws);
    }

    _onnomorehistory() {
        this.stopGetHist = true;
    }

    _onmessageformsubmitted(text) {
        this.ws.send({message: text});
    }

    _onloggedin() {
        this.authorised = true;
        this.userModel.getSelf();
    }

    _ongethistory() {
        if(this.stopGetHist) {
            return;
        }
        this.chatModel.getChatHistory({page: this.page});
        this.page++;
    }
    
    _onloggedout() {
        this.authorised = false;
        this.userModel.getSelf();
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
