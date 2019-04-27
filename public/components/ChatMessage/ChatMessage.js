'use strict';

const validAuthors = ['me', 'partner'];

export class ChatMessage {
    constructor({
        author = 'me',
        text = '',
        authorName = '-anonymous-',
    } = {}) {
        this.author = validAuthors.includes(author) ? author : 'me';
        this.authorName = authorName;
        if (author == 'me') {
            this.authorName = '@me';
        }
        this.text = text;
    }

    render() {
        const messageArea = document.createElement('div');
        messageArea.classList.add('chat-message-area');

        const name = document.createElement('div');
        name.classList.add('chat-name');
        name.innerText = this.authorName;

        const breaker = document.createElement('div');
        breaker.classList.add('breaker');

        const message = document.createElement('div');
        message.classList.add('chat-message');
        message.innerText = this.text;

        if(this.author == 'me') {
            message.classList.add('chat-message__right');
            name.classList.add('chat-name__right');
        } else {
            message.classList.add('chat-message__left');
            name.classList.add('chat-name__left');
        }

        messageArea.appendChild(name);
        messageArea.appendChild(breaker);
        messageArea.appendChild(message);

        return messageArea;
    }
}