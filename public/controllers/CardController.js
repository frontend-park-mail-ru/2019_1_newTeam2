import {Controller} from 'Controllers/Controller.js';
import {CardModel} from 'Models/CardModel.js';
import {DictionaryModel} from 'Models/DictionaryModel.js';
import {Card} from 'Views/Card/Card.js';

import validation from 'Services/validation.js';
import bus from 'Services/bus.js';


export class CardController extends Controller{
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

        this.listeners = new Set ([
            ['prev-page', this._onprevpage],
            ['next-page', this._onnextpage],
            ['new-card-form-submitted', this._onnewcardformsubmitted],
            ['card-removed', this._oncardremoved],
        ]);

        super.subscribeAll();
    }

    _onnewcardformsubmitted(card) {
        let passed = true;
        if(!validation.checkWord(card.word.name, 'Rus')) {
            bus.emit('wrong-word', card.word.name);
            passed = false;
        }

        if(!validation.checkWord(card.translation.name, 'Eng')) {
            bus.emit('wrong-translation', card.translation.name);
            passed = false;
        }

        if(passed) {
            this.model.createCard(card, this.id);
        }
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
}