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
        this.page = 1;
        this.rows = 5;
        
        bus.on('prev-page', this._onprevpage, this);
        bus.on('next-page', this._onnextpage, this);
        bus.on('new-dict-form-submitted', this._onnewdict, this);
        bus.on('dict-created', this._on_dict_created, this);
        bus.on('create-dict-error', this._on_create_dict_error, this);
        bus.on('dict-removed', this._on_dict_removed, this);
    }

    _on_dict_created(dict) {
        router.go('dictionary/' + dict.id);
    }

    _on_create_dict_error() {
        //TODO(gleensande): обработка ошибки создания словаря
    }

    _on_dict_removed(id) {
        this.model.deleteDict(id);
    }

    _onnewdict(dict) {
        this.model.createDict(dict);
    }

    _onprevpage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        this.model.getSelfDicts({
            rows: this.rows, 
            page: this.page
        });
    }

    _onnextpage() {
        this.page++;
        this.model.getSelfDicts({
            rows:this.rows, 
            page:this.page
        });
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