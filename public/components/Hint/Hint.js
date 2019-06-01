'use strict';

const hintTemplate = require('Templates/Hint.pug');

const noop = () => {};

export class Hint {
    constructor({
        headline = '',
        content = '',
        handler = noop,
        classname = '',
        id = 'hint',
    } = {}) {
        this._headline = headline;
        this._content = content;
        this._handler = handler;
        this._classname = classname;
        this._id = id;
    }

    render () {
        let hintBoard = document.createElement('div');
        hintBoard.addEventListener('click', this._handler);
        hintBoard.innerHTML = hintTemplate({
            headline: this._headline,
            text: this._content,
            classname: this._classname,
            id: this._id,
        });
        return hintBoard;
    }

}
