import {DictionaryModel} from "../models/DictionaryModel.js";
import {Dictionary} from "../views/Dictionary/Dictionary.js";
import bus from "../services/bus.js";


export class DictionaryController {
    index(options = {}) {
        this.model = new DictionaryModel();
        this.view = new Dictionary();
        this.view.render();
        this.model.getSelfDicts();

        this._onnewdict = (dict) => {
            this.model.createDict(dict);
        };

        bus.on('new-dict-form-submitted', this._onnewdict);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('new-dict-form-submitted', this._onnewdict);
    }
}