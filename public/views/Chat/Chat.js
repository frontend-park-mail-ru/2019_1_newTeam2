'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {ChatData} from '/components/ChatData/ChatData.js';
import {ChatMessage} from '/components/ChatMessage/ChatMessage.js';
import {ChatForm} from '/components/ChatForm/ChatForm.js';

import router from '/services/router.js';
import ws from '/services/webSocket.js';

const application = document.getElementById('application');

export class Chat extends View {
    render({authorised = false}) {
        application.innerHTML = '';

        const outer = application;
        outer.innerHTML = '';

        const nameOfHeadline = authorised ? 'Языковой чат' : 'Анонимный языковой чат';
        const headline = new Headline({size: 'h1', textContent: nameOfHeadline});

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline.render());

        this.forData = new ChatData().render();
        outer.appendChild(this.forData);

        this.forInput = document.createElement('div');
        outer.appendChild(this.forInput);

        this.forInput.appendChild(new ChatForm().render()); // TODO(): on ws opened

        this.listeners = new Set([
            ['message-form-submitted', this._onmessageformsubmitted],
            ['ws-opened', this._onwsopened],
        ]);
        super.subscribeAll();
    }

    _onmessageformsubmitted(text) {
        ws.send(text);
        this.forData.appendChild(new ChatMessage({author: 'me', text: text}).render());
    }

    _onwsopened() {
        this.forInput.appendChild(new ChatForm().render());
    }
}