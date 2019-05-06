import {Controller} from 'Controllers/Controller.js';
import {Menu} from 'Views/Menu/Menu.js';
import auth from 'Models/AuthModel.js';

export class MenuController extends Controller {
    index() {
        this.view = new Menu();
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