import {CardModel} from "/models/CardModel.js";
import {Card} from "/views/Card/Card.js";


export class CardController {
    index(options = {}) {
        this.model = new CardModel();
        this.view = new Card();
        this.view.render(options);
        this.model.getCardsByDictId({id: options.id});
    }

    preventAllEvents() {
        this.view.preventAllEvents();

    }
}