import {Controller} from 'Controllers/Controller.js';
import {About} from 'Views/About/About.js';

export class AboutController extends Controller {
    index() {
        this.view = new About();
        this.view.render();
    }
}
