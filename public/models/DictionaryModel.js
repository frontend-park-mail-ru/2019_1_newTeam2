import ajax from "/services/ajax.js";
import bus from "/services/bus.js";


export class DictionaryModel {
    constructor() {
        this.url = 'dictionary'
    }

    getSelfDicts({rows = 5, page = 1} = {rows: 5, page: 1}) {
        ajax.doGet({
            path: this.url + `?rows=${rows}&page=${page}`
        })
        .then((res) => {
            res.json()
            .then( (res) => {
                setTimeout(bus.emit.bind(bus), 0, 'dicts-loaded', res);
            })
            .catch( (err) => {
                console.log(err);
            });
        })
        .catch( (err) => {
            console.log(err)
        });
    }

    getDict(id = 0) {
        ajax.doGet({
            path: this.url + '/' + id.toString(10)
        })
        .then((res) => {
            res.json()
            .then((res) => {
                setTimeout(bus.emit.bind(bus), 0, 'dict-loaded', res);
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
            setTimeout(bus.emit.bind(bus), 0, 'load-dict-error');
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
                setTimeout(bus.emit.bind(bus), 0, 'dict-created', res);
            })
            .catch((err) => {
                setTimeout(bus.emit.bind(bus), 0, 'create-dict-error', err);
            });
        })
        .catch ((error) => {
            setTimeout(bus.emit.bind(bus), 0, 'create-dict-error', error);
        });
    }

    updateDict(id = 0, body) {
        ajax.doPut({
            path: this.url + '/',
            body: body
        })
        .then(() => {
            setTimeout(bus.emit.bind(bus), 0, 'dict-updated');
        })
        .catch ((error) => {
            setTimeout(bus.emit.bind(bus), 0, 'update-dict-error', error);
            console.log("some shit happened: " + error);
        });
    }

    deleteDict(body) {
        ajax.doDelete({
            path: this.url + '/',
            body: body
        })
        .then(() => {
            setTimeout(bus.emit.bind(bus), 0, 'dict-deleted');
        })
        .catch((error) => {
            setTimeout(bus.emit.bind(bus), 0, 'delete-dict-error', error);
        });
    }
}