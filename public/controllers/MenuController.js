import {Menu} from '/views/Menu/Menu.js';
import auth from '/models/AuthModel.js';
import bus from '/services/bus.js';

export class MenuController {
    index() {
        this.view = new Menu();
        auth.isAuthorised();
        
        bus.on('logged-in', this._onloggedin, this);
        bus.on('logged-out', this._onloggedout, this);
    }

    _onloggedin() {
        this.view.render({authorised: true});
    }
    
    _onloggedout() {
        this.view.render({authorised: false});
    }

    preventAllEvents() {
        bus.off('logged-in', this._onloggedin);
        bus.off('logged-out', this._onloggedout);
    }
}