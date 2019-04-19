import {Training} from "/views/Training/Training.js";
import {GameWordsModel} from "/models/GameWordsModel.js";
import bus from "/services/bus.js";
import router from "/services/router.js";
import {DictionaryModel} from "/models/DictionaryModel.js";

export class TrainingController {
	index() {
		this.view = new Training();
		this.view.render();
		this.dictModel = new DictionaryModel();
		this.dictModel.getSelfDicts();
		this.gameModel = new GameWordsModel();
		bus.on('dict-selected', this.ondictselected.bind(this));
		bus.on('training-finished', this.ontrainingfinished.bind(this));
	}

	ondictselected(dictID) {
		this.gameModel.getCards(dictID, 10);
	}

	ontrainingfinished(result) {
		this.gameModel.sendResult(result);
		router.go('menu');
	}

	preventAllEvents() {
		this.view.preventAllEvents();
		bus.off('dict-selected', this.ondictselected);
		bus.off('training-finished', this.ontrainingfinished);
	}
}