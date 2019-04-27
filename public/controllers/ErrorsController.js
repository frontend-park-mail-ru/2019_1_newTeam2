import {Controller} from '/controllers/Controller.js';
import {Errors} from '/views/Errors/Errors.js';

export class ErrorsController extends Controller {
    index() {
        this.view = new Errors();

        this.listeners = new Set ([
            ['prev-page', this._onnotfound],
        ]);

        super.subscribeAll();
    }

    _onnotfound() {
        this.view.render({errorText: 'К сожалению, такая страница не найдена :('});
    }
}