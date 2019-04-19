import {DictionaryModel} from '/models/DictionaryModel.js';
import {Dictionary} from '/views/Dictionary/Dictionary.js';
import bus from '/services/bus.js';
import router from '/services/router.js';


export class DictionaryController {
    index() {
        this.model = new DictionaryModel();
        this.view = new Dictionary();
        this.view.render();
        this.model.getSelfDicts();

        this._onnewdict = (dict) => {
            this.model.createDict(dict);
        };

        this._on_dict_created = (dict) => {
            router.go('dictionary/' + dict.id);
        };

        this._on_create_dict_error = () => {
            //TODO(gleensande): обработка ошибки создания словаря
        };

        this._on_dict_removed = (id) => {
            this.model.deleteDict(id);
        };

        bus.on('new-dict-form-submitted', this._onnewdict);
        bus.on('dict-created', this._on_dict_created);
        bus.on('create-dict-error', this._on_create_dict_error);
        bus.on('dict-removed', this._on_dict_removed);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('new-dict-form-submitted', this._onnewdict);
        bus.off('dict-created', this._on_dict_created);
        bus.off('create-dict-error', this._on_create_dict_error);
        bus.off('dict-removed', this._on_dict_removed);
    }
}