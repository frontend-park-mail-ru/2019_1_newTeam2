import {Controller} from 'Controllers/Controller.js';
import {Error404} from 'Views/Errors/Error404.js';

export class Error404Controller extends Controller {
    index() {
        this.view = new Error404();
        this.view.render();

        super.subscribeAll();
    }
}