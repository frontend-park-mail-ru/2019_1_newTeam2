import {CardModel} from "/models/CardModel.js";
import {DictionaryModel} from "/models/DictionaryModel.js";
import {Card} from "/views/Card/Card.js";
import bus from "/services/bus.js";


export class CardController {
    index(options = {path: ''}) {
        [this.name, this.id] = options.path.split('/');
        this.dictionary = new DictionaryModel().getDict(this.id);
        this.model = new CardModel();
        this.view = new Card();
        this.view.render();
        this.model.getCardsByDictId({id: this.id});

        this._onnewcardformsubmitted = (body) => {
            this.model.createCard(body);
        }

        bus.on('new-card-form-submitted', this._onnewcardformsubmitted);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('new-card-form-submitted', this._onnewcardformsubmitted);
    }
}