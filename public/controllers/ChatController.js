import {Controller} from '/controllers/Controller.js';
import {Chat} from '/views/Chat/Chat.js';
import auth from '/models/AuthModel.js';

export class ChatController extends Controller {
    index() {
        this.view = new Chat();
        auth.isAuthorised();
        
        this.listeners = new Set ([
            ['logged-in', this._onloggedin],
            ['logged-out', this._onloggedout],
        ]);

        super.subscribeAll();
    }

    _onloggedin() {
        this.view.render({authorised: true});
    }
    
    _onloggedout() {
        this.view.render({authorised: false});
    }
}