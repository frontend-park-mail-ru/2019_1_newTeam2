import {Menu} from "../views/Menu/Menu.js";
import auth from '../services/auth.js';

export class MenuController {
    index() {
        const menu = new Menu();
        menu.render({authorised: auth.isAuthorised()});
    }

    preventAllEvents() {

    }
}