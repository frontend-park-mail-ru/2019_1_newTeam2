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

        if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }

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
            ['ws-message-received', this._onmessagereceived],
        ]);
        super.subscribeAll();
    }

    _onmessageformsubmitted(text) {
        ws.send({message: text});
        const message = new ChatMessage({author: 'me', text: text}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

    _onwsopened() {
        this.forInput.appendChild(new ChatForm().render());
    }

    _notify(data) {
        if (!'Notification' in window) {
            console.error('notifications not supported');
            return;
        }

        if (Notification.permission === 'granted') {
            new Notification(data);
            return;
        }

        if (Notification.permission !== 'denied') {
            Notification
                .requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        new Notification(data);
                        return;
                    }
                })
        }
    }

    _onmessagereceived(data) {
        if(document.hidden) {
            this._notify(data.message);
        }
        const message = new ChatMessage({author: 'partner', text: data.message}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

}