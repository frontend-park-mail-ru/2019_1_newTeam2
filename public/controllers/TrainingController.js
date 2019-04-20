import {Training} from "/views/Training/Training.js";
import {GameWordsModel} from "/models/GameWordsModel.js";
import bus from "/services/bus.js";
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

		let page = 1;
		const rows = 5;

		this._onprevpage = () => {
			page = page < 2 ? 1 : page - 1;
			this.dictModel.getSelfDicts({rows:rows, page:page});
		};
		bus.on('prev-page', this._onprevpage);

		this._onnextpage = () => {
			page++;
			this.dictModel.getSelfDicts({rows:rows, page:page});
		};
		bus.on('next-page', this._onnextpage);
	}

	ondictselected(dictID) {
		this.gameModel.getCards(dictID, 10);
	}

	ontrainingfinished(result) {
		this.gameModel.sendResult(result);
	}

	preventAllEvents() {
		this.view.preventAllEvents();
		bus.off('dict-selected', this.ondictselected);
		bus.off('training-finished', this.ontrainingfinished);
	}
}