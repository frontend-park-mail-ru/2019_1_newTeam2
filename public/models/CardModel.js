import ajax from '/services/ajax.js';
import bus from '/services/bus.js';


export class CardModel {
    constructor() {
        this.url = 'card';
    }

    getCardsByDictId({ rows = 5, page = 1, id = 0 } = { rows: 5, page: 1, id: 0 }) {
        ajax.doGet({
            path: this.url + `s?dict=${id}&rows=${rows}&page=${page}`
        })
            .then((res) => {
                res.json()
                    .then((res) => {
                        setTimeout(bus.emit.bind(bus), 0, 'cards-loaded', res);
                    })
                    .catch((err) => {
                        // TODO(gleensande): обработка ошибки
                        console.log(err);
                    });
            })
            .catch((err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
            });
    }

    getCard(id = 0) {
        ajax.doGet({
            path: this.url + '/' + id.toString(10)
        })
            .then((res) => {
                res.json()
                    .then((res) => {
                        setTimeout(bus.emit.bind(bus), 0, 'card-loaded', res);
                    })
                    .catch((err) => {
                        // TODO(gleensande): обработка ошибки
                        console.log(err);
                    });
            })
            .catch((err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
                setTimeout(bus.emit.bind(bus), 0, 'load-card-error');
            });
    }

    createCard(body, dictId) {
        ajax.doPost({
            path: this.url + '/?dictionaryId=' + dictId,
            body: body
        })
            .then(() => {
                setTimeout(bus.emit.bind(bus), 0, 'card-created');
            })
            .catch((error) => {
                setTimeout(bus.emit.bind(bus), 0, 'create-card-error', error);
            });
    }

    updateCard(id = 0, body) {
        ajax.doPut({
            path: this.url + '/' + id,
            body: body
        }).then(
            () => {
                setTimeout(bus.emit.bind(bus), 0, 'card-updated');
            },
            (error) => {
                setTimeout(bus.emit.bind(bus), 0, 'update-card-error', error);
                // TODO(gleensande): обработка ошибки
                console.log('ошибка во время обновления карты: ' + error);
            }
        );
    }

    deleteCard(id = 0) {
        ajax.doDelete({
            path: this.url + '/' + id.toString(10)
        })
            .then(() => {
                setTimeout(bus.emit.bind(bus), 0, 'card-deleted');
            })
            .catch((error) => {
                setTimeout(bus.emit.bind(bus), 0, 'delete-card-error', error);
            });
    }
}