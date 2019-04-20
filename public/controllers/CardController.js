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

        let page = 1;
        const rows = 5;

        this._onprevpage = () => {
            page = page < 2 ? 1 : page - 1;
            this.model.getCardsByDictId({id: this.id, rows:rows, page:page});
        };
        bus.on('prev-page', this._onprevpage);

        this._onnextpage = () => {
            page++;
            this.model.getCardsByDictId({id: this.id, rows:rows, page:page});
        };
        bus.on('next-page', this._onnextpage);

        bus.on('new-card-form-submitted', this._onnewcardformsubmitted);
        bus.on('card-removed', this._oncardremoved);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('next-page', this._onnextpage);
        bus.off('prev-page', this._onprevpage);
        bus.off('new-card-form-submitted', this._onnewcardformsubmitted);
        bus.off('card-removed', this._oncardremoved);
    }
}