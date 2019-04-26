import {Training} from '/views/Training/Training.js';
import {GameWordsModel} from '/models/GameWordsModel.js';
import bus from '/services/bus.js';
import {DictionaryModel} from '/models/DictionaryModel.js';

export class TrainingController {
    index() {
        this.view = new Training();
        this.view.render();
        this.dictModel = new DictionaryModel();
        this.dictModel.getSelfDicts();
        this.gameModel = new GameWordsModel();
        
        this.page = 1;
        this.rows = 5;
        
        bus.on('dict-selected', this._ondictselected, this);
        bus.on('training-finished', this._ontrainingfinished, this);
        bus.on('prev-page', this._onprevpage, this);
        bus.on('next-page', this._onnextpage, this);
    }

    _ondictselected(dictID) {
        this.gameModel.getCards(dictID, 10);
    }

    _ontrainingfinished(result) {
        this.gameModel.sendResult(result);
    }

    _onprevpage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        this.dictModel.getSelfDicts({rows: this.rows, page: this.page});
    }

    _onnextpage() {
        this.page++;
        this.dictModel.getSelfDicts({rows:this.rows, page:this.page});
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('dict-selected', this.ondictselected);
        bus.off('training-finished', this.ontrainingfinished);
    }
}