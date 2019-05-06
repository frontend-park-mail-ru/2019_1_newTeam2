import ajax from 'Services/ajax.js';
import bus from 'Services/bus.js';


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
                        bus.emit('cards-loaded', res);
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
                        bus.emit('card-loaded', res);
                    })
                    .catch((err) => {
                        // TODO(gleensande): обработка ошибки
                        console.log(err);
                    });
            })
            .catch((err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
                bus.emit('load-card-error');
            });
    }

    createCard(body, dictId) {
        ajax.doPost({
            path: this.url + '/?dictionaryId=' + dictId,
            body: body
        })
            .then(() => {
                bus.emit('card-created');
            })
            .catch((error) => {
                bus.emit('create-card-error', error);
            });
    }

    updateCard(id = 0, body) {
        ajax.doPut({
            path: this.url + '/' + id,
            body: body
        }).then(
            () => {
                bus.emit('card-updated');
            },
            (error) => {
                bus.emit('update-card-error', error);
                // TODO(gleensande): обработка ошибки
                console.log('ошибка во время обновления карты: ' + error);
            }
        );
    }

    deleteCard(body) {
        ajax.doDelete({
            path: this.url + '/',
            body: body
        })
            .then(() => {
                bus.emit('card-deleted', body.cardId);
            })
            .catch((error) => {
                bus.emit('delete-card-error', error);
            });
    }
}