'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {ChatData} from '/components/ChatData/ChatData.js';
import {ChatMessage} from '/components/ChatMessage/ChatMessage.js';
import {ChatForm} from '/components/ChatForm/ChatForm.js';

import router from '/services/router.js';
import {chatWebSocket} from '/services/chatWebSocket.js';

const application = document.getElementById('application');

export class Chat extends View {
    render({authorised = false}) {
        application.innerHTML = '';
        const outer = application;
        outer.innerHTML = '';

        this.ws = new chatWebSocket();

        const nameOfHeadline = 'Языковой чат';
        const headline = new Headline({size: 'h1', textContent: nameOfHeadline}).render();

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline);

        if (!authorised) {
            const needToLogin = new Headline({size: 'h1', textContent: 'Чтобы участвовать в беседе, зайдите в систему'}).render();
            outer.appendChild(needToLogin);
            return;
        }

        this.forData = new ChatData().render();
        outer.appendChild(this.forData);


        if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }

        
        this.forInput = document.createElement('div');
        outer.appendChild(this.forInput);

        this.listeners = new Set([
            ['message-form-submitted', this._onmessageformsubmitted],
            ['ws-opened', this._onwsopened],
            ['name-got', this._onnamegot],
        ]);
        super.subscribeAll();
    }

    _onmessageformsubmitted(text) {
        const message = new ChatMessage({author: 'me', text: text}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

    _onwsopened() {
        this.forInput.appendChild(new ChatForm().render());
    }

    _onnamegot(data) {
        const message = new ChatMessage({author: 'partner', text: data.message}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

}