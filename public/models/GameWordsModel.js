import bus from '/services/bus.js';
import ajax from '/services/ajax.js';


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
                            setTimeout(bus.emit.bind(bus), 0, 'game-cards-loaded', res);
                        }
                    );
            })
            .catch((error) => {
                setTimeout(bus.emit.bind(bus), 0, 'load-game-cards-error', error);
            });
    }

    sendResult(body) {
        ajax.doPost({
            path: this.url,
            body: body
        })
            .then(() => {
                setTimeout(bus.emit.bind(bus), 0, 'game-result-sent');
            })
            .catch((error) => {
                setTimeout(bus.emit.bind(bus), 0, 'load-game-card-error', error);
            });
    }
}