'use strict';

const validAuthors = ['me', 'partner'];

export class ChatMessage {
    constructor({
        author = 'me',
        text = ''
    } = {}) {
        this.author = validAuthors.includes(author) ? author : 'me';
        this.text = text;
    }

    render() {
        const outer = document.createElement('div');
        outer.innerText = this.text;
       
        outer.classList.add('chat-message');

        if(this.author == 'me') {
            outer.classList.add('chat-message__right');
        } else {
            outer.classList.add('chat-message__left');
        }

        return outer;
    }
}