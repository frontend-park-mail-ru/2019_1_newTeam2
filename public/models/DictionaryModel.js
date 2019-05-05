import ajax from 'Services/ajax.js';
import bus from 'Services/bus.js';


export class DictionaryModel {
    constructor() {
        this.url = 'dictionary';
    }

    getSelfDicts({rows = 5, page = 1} = {rows: 5, page: 1}) {
        ajax.doGet({
            path: this.url + `?rows=${rows}&page=${page}`
        })
            .then((res) => {
                res.json()
                    .then( (res) => {
                        bus.emit('dicts-loaded', res);
                    })
                    .catch( (err) => {
                        // TODO(gleensande): обработка ошибки
                        console.log(err);
                    });
            })
            .catch( (err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
            });
    }

    getDict(id = 0) {
        ajax.doGet({
            path: this.url + '/' + id.toString(10)
        })
            .then((res) => {
                res.json()
                    .then((res) => {
                        bus.emit('dict-loaded', res);
                    })
                    .catch((err) => {
                        // TODO(gleensande): обработка ошибки
                        console.log(err);
                    });
            })
            .catch((err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
                bus.emit('load-dict-error');
            });
    }

    createDict(body) {
        ajax.doPost({
            path: this.url + '/',
            body: body
        })
            .then((res) => {
                res.json()
                    .then ((res) => {
                        bus.emit('dict-created', res);
                    })
                    .catch((err) => {
                        // TODO(gleensande): обработка ошибки
                        bus.emit('create-dict-error', err);
                    });
            })
            .catch ((error) => {
                // TODO(gleensande): обработка ошибки
                bus.emit('create-dict-error', error);
            });
    }

    updateDict(id = 0, body) {
        ajax.doPut({
            path: this.url + '/' + id,
            body: body
        })
            .then(() => {
                bus.emit('dict-updated');
            })
            .catch ((error) => {
                bus.emit('update-dict-error', error);
                // TODO(gleensande): обработка ошибки
                console.log('error while update dict' + error);
            });
    }

    deleteDict(id = 0) {
        ajax.doDelete({
            path: this.url + '/' + id.toString(10)
        })
            .then(() => {
                bus.emit('dict-deleted');
            })
            .catch((error) => {
                // TODO(gleensande): обработка ошибки
                bus.emit('delete-dict-error', error);
            });
    }
}