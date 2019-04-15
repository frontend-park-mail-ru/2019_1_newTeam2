import {Errors} from '/views/Errors/Errors.js';
import bus from "/services/bus.js";

export class ErrorsController {
    index() {
        this.view = new Errors();


        this._on_not_found = () => {
            this.view.render({errorText: "К сожалению, такая страница не найдена :("});
        }

        bus.on('not-found-error', this._on_not_found);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        // От этого события не надо отписываться никогда ??
        // bus.off('not-found-error', this._on_not_found);
    }
}