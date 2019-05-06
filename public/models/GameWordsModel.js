import bus from 'Services/bus.js';
import ajax from 'Services/ajax.js';


export class GameWordsModel {
    constructor(
        {
            mode = 'single'
        } = {
            mode: 'single'
        }) {
        this.url = mode;
    }

    getCards(dictId, wordNum) {
        ajax.doGet({
            path: this.url + '?dict=' + dictId + '&words=' + wordNum,
        })
            .then((res) => {
                res.json()
                    .then(
                        (res) => {
                            bus.emit('game-cards-loaded', res);
                        }
                    );
            })
            .catch((error) => {
                bus.emit('load-game-cards-error', error);
            });
    }

    sendResult(body) {
        ajax.doPost({
            path: this.url,
            body: body
        })
            .then(() => {
                bus.emit('game-result-sent');
            })
            .catch((error) => {
                bus.emit('load-game-card-error', error);
            });
    }
}