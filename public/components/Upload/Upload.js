'use strict';

const uploadTemplate = require('Templates/Upload.pug');

const noop = () => {};

export class Upload {
    /**
     * Creates a new Upload.
     * @class
     */
    constructor({
        type = 'file',
        callback = noop,
    } = {}) {
        this._type = type;
        this._handler = callback;
    }

    /**
     * renders the upload
     * @returns {object} - the DOM element: div with rendered element
     */
    render() {
        let type = 'upload ';
        let files = '';
        switch(this._type) {
        case 'image':
            type += this._type;
            files = 'image/*';
            break;
        case 'file':
            type += this._type;
            break;
        }

        const outer = document.createElement('span');
        outer.innerHTML = uploadTemplate({'type': type, 'files': files});
        
        /* const outerDiv = document.createElement('div');
        outerDiv.id = this._outerId;
        outerDiv.classList.add(this._outerId);
        outerDiv.innerHTML = html;
        outerDiv.addEventListener('click', this._handler);
        return outerDiv; */

        outer.addEventListener('click', this._handler);
    
        return outer;
    }
}
