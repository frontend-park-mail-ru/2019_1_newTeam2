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
        let page = 1;
        const rows = 5;
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

        this._onprevpage = () => {
            page = page < 2 ? 1 : page - 1;
            this.model.getSelfDicts({rows:rows, page:page});
        };
        bus.on('prev-page', this._onprevpage);

        this._onnextpage = () => {
            page++;
            this.model.getSelfDicts({rows:rows, page:page});
        };
        bus.on('next-page', this._onnextpage);
        bus.on('new-dict-form-submitted', this._onnewdict);
        bus.on('dict-created', this._on_dict_created);
        bus.on('create-dict-error', this._on_create_dict_error);
        bus.on('dict-removed', this._on_dict_removed);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('next-page', this._onnextpage);
        bus.off('prev-page', this._onprevpage);
        bus.off('new-dict-form-submitted', this._onnewdict);
        bus.off('dict-created', this._on_dict_created);
        bus.off('create-dict-error', this._on_create_dict_error);
        bus.off('dict-removed', this._on_dict_removed);
    }
}