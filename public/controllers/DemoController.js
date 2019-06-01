import {Controller} from 'Controllers/Controller.js';
import {Demo} from 'Views/Demo/Demo.js';
import {GameWordsModel} from 'Models/GameWordsModel.js';

export class DemoController extends Controller {
    index() {
        this.view = new Demo();
        this.view.render();
        this.gameModel = new GameWordsModel();
        this.gameModel.getDemo();
        
        super.subscribeAll();
    }
}