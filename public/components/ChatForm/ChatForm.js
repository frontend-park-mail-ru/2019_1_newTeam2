'use strict';

import {Input} from '/components/Input/Input.js';
import {Button} from '/components/Button/Button.js';

import bus from '/services/bus.js';

export class ChatForm {
    constructor() {
    
    }

    render() {
        const outer = document.createElement('div');
        outer.classList.add('chat-form');
        outer.id = 'message-form';

        const input = new Input({
            id: 'message',
            type: 'text',
            placeholder: 'Ваше сообщение',
        }).render();
        outer.appendChild(input);

        const send = new Button({
            type: 'secondary', 
            name: 'Отправить',
            handler: (() => {
                const text = document.getElementById('message').value;
                document.getElementById('message').value = '';
                bus.emit('message-form-submitted', text);
            }),
        }).render();
        outer.appendChild(send);

        return outer;
    }
}