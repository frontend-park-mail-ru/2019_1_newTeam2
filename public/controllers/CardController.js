import {CardModel} from '/models/CardModel.js';
import {DictionaryModel} from '/models/DictionaryModel.js';
import {Card} from '/views/Card/Card.js';
import bus from '/services/bus.js';


export class CardController {
    index(options = {path: ''}) {
        [this.name, this.id] = options.path.split('/');
        this.id = parseInt(this.id);
        this.dictionary = new DictionaryModel().getDict(this.id);
        this.model = new CardModel();
        this.view = new Card();
        this.view.render();
        this.model.getCardsByDictId({id: this.id});

        this._onnewcardformsubmitted = (body) => {
            this.model.createCard(body, this.id);
        };

        this._oncardremoved = (cardId) => {
            this.model.deleteCard({
                dictionaryId: this.id,
                cardId: cardId
            });
        };

        bus.on('new-card-form-submitted', this._onnewcardformsubmitted);
        bus.on('card-removed', this._oncardremoved);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('new-card-form-submitted', this._onnewcardformsubmitted);
        bus.off('card-removed', this._oncardremoved);
    }
}