import {Controller} from 'Controllers/Controller.js';
import {Demo} from 'Views/Demo/Demo.js';
import {GameWordsModel} from 'Models/GameWordsModel.js';
import {DictionaryModel} from 'Models/DictionaryModel.js';

export class DemoController extends Controller {
    index() {
        this.view = new Demo();
        this.view.render();
        //this.gameModel = new GameWordsModel();
        //this.gameModel.getCards(0, 10); 
        
        this.listeners = new Set ([
            ['training-finished', this._ontrainingfinished],
        ]);

        super.subscribeAll();
    }

    _ontrainingfinished(result) {
        //this.gameModel.sendResult(result);
    }
}