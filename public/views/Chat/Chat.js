'use strict';

import {Page} from 'Views/Page.js';
import {Headline} from 'Components/Headline/Headline.js';
import {Icon} from 'Components/Icon/Icon.js';
import {ChatData} from 'Components/ChatData/ChatData.js';
import {ChatMessage} from 'Components/ChatMessage/ChatMessage.js';
import {ChatForm} from 'Components/ChatForm/ChatForm.js';

import router from 'Services/router.js';
import {chatWebSocket} from 'Services/chatWebSocket.js';
import bus from 'Services/bus.js';

export class Chat extends Page {
    render({authorised = false, ws = new chatWebSocket()}) {
        super.renderBase();

        this.ws = ws;

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/back.png',
            id: 'back',
            handler: () => {
                this.ws.destroy();
                router.back();
            }
        }).render());

        this.forHeader.appendChild(new Icon({
            src: '/static/icons/home.png',
            handler: () => {
                this.ws.destroy();
                router.go('menu');
            }
        }).render());

        const headline = new Headline({size: 'h1', textContent: 'Языковой чат'}).render();
        this.forHeader.appendChild(headline);

        if (!authorised) {
            const needToLogin = new Headline({size: 'h1', textContent: 'Чтобы участвовать в беседе, зайдите в систему'}).render();
            this.forContent.appendChild(needToLogin);
            return;
        }
        this.forHistory = document.createElement('div');
        this.forHistoryAnchor = document.createElement('div');
        this.forData = new ChatData().render();
        this.forHistory.appendChild(this.forHistoryAnchor);
        this.forData.appendChild(this.forHistory);
        this.forContent.appendChild(this.forData);


        if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }

        bus.emit('get-history');

        this.forData.addEventListener('scroll', (event) => {
            const element = event.target;
            if(element.scrollTop === 0) {
                bus.emit('get-history');
            }
        });

        this.forInput = document.createElement('div');
        this.forContent.appendChild(this.forInput);

        this.listeners = new Set([
            ['message-form-submitted', this._onmessageformsubmitted],
            ['ws-opened', this._onwsopened],
            ['name-got', this._onnamegot],
            ['history-loaded', this._onhistoryloaded],
        ]);
        super.subscribeAll();
    }

    _onmessageformsubmitted(text) {
        const message = new ChatMessage({author: 'me', text: text}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

    _onhistoryloaded(data) {
        if(!data.length) {
            bus.emit('no-more-history');
        }
        let ref;
        data.forEach(mes => {
            const message = new ChatMessage({author: 'partner', text: mes.message}).render();
            if(!ref) {
                ref = message;
            }
            this.forHistory.insertBefore(message, this.forHistoryAnchor);
            this.forHistoryAnchor = message;
        });
        if(ref) {
            ref.scrollIntoView();
        }
    }

    _onwsopened() {
        this.forInput.appendChild(new ChatForm().render());
    }

    _onnamegot(data) {
        // data format: { id: 4, message: "Welcome to Word chat!)" }
        const message = new ChatMessage({author: 'partner', text: data.message}).render();
        this.forData.appendChild(message);
        message.scrollIntoView();
    }

}
