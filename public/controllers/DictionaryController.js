import {Controller} from 'Controllers/Controller.js';
import {DictionaryModel} from 'Models/DictionaryModel.js';
import {Dictionary} from 'Views/Dictionary/Dictionary.js';
import router from 'Services/router.js';
 

export class DictionaryController extends Controller{
    index() {
        this.model = new DictionaryModel();
        this.view = new Dictionary();
        this.view.render();
        this.model.getSelfDicts();
        this.page = 1;
        this.rows = 5;

        this.listeners = new Set ([
            ['prev-page', this._onprevpage],
            ['next-page', this._onnextpage],
            ['new-dict-form-submitted', this._onnewdict],
            ['dict-created', this._on_dict_created],
            ['create-dict-error', this._on_create_dict_error],
            ['dict-removed', this._on_dict_removed],
        ]);

        super.subscribeAll();
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
}