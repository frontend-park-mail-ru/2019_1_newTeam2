import {Menu} from "../views/Menu/Menu.js";
import auth from '../models/AuthModel.js';
import bus from "../services/bus.js";

export class MenuController {
    index() {
        const menu = new Menu();
        auth.isAuthorised();
        this._onloggedin = () => {
            menu.render({authorised: true});
        };
        bus.on('logged-in', this._onloggedin);
        this._onloggedout = () => {
            menu.render({authorised: false});
        };
        bus.on('logged-out', this._onloggedout);
    }

    preventAllEvents() {
        bus.off('logged-in', this._onloggedin);
        bus.off('logged-out', this._onloggedout);
    }
}