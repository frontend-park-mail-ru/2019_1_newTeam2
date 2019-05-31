'use strict';

import {Input} from 'Components/Input/Input.js';
import {Icon} from 'Components/Button/Button.js';

import bus from 'Services/bus.js';

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

        const send = new Icon({
            src: '/static/icons/send.png',
            handler: (() => {
                const text = document.getElementById('message').value;
                if (!text) {
                    return;
                }
                document.getElementById('message').value = '';
                bus.emit('message-form-submitted', text);
            }),
        }).render();
        outer.appendChild(send);

        outer.addEventListener( 'keyup', (event) => {
            if(event.keyCode === 13){ // Enter button clicked
                send.click();
            }
        });

        return outer;
    }
}