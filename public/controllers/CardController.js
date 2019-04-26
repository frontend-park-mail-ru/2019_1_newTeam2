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

        this.page = 1;
        this.rows = 5;

        bus.on('prev-page', this._onprevpage, this);
        bus.on('next-page', this._onnextpage, this);
        bus.on('new-card-form-submitted', this._onnewcardformsubmitted, this);
        bus.on('card-removed', this._oncardremoved, this);
    }

    _onnewcardformsubmitted(body) {
        this.model.createCard(body, this.id); 
    }

    _oncardremoved(cardId) {
        this.model.deleteCard({
            dictionaryId: this.id,
            cardId: cardId
        });
    }

    _onprevpage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        this.model.getCardsByDictId({id: this.id, rows:this.rows, page:this.page});
    }
    
    _onnextpage() {
        this.page++;
        this.model.getCardsByDictId({id: this.id, rows:this.rows, page:this.page});
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('next-page', this._onnextpage);
        bus.off('prev-page', this._onprevpage);
        bus.off('new-card-form-submitted', this._onnewcardformsubmitted);
        bus.off('card-removed', this._oncardremoved);
    }
}