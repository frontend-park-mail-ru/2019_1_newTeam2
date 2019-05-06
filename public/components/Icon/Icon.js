'use strict';

const iconTemplate = require('Templates/Icon.pug');

const noop = () => {};

export class Icon {

    constructor({
        src = '',
        handler = noop,
        id = '',
        classname = ''
    } = {}) {
        this._src = src;
        this._handler = handler;
        this._id = id;
        this._classname = classname;
    }

    render() {
        const outer = document.createElement('span');
        outer.innerHTML = iconTemplate({
            'path': this._src, 
            'id': this._id, 
            'classname': this._classname
        });

        outer.addEventListener('click', this._handler, true);
    
        return outer;
    }
}
