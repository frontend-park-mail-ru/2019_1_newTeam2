'use strict';

import {View} from 'Views/View.js';
import {Headline} from 'Components/Headline/Headline.js';
import {Icon} from 'Components/Icon/Icon.js';
import {ChatData} from 'Components/ChatData/ChatData.js';
import {ChatMessage} from 'Components/ChatMessage/ChatMessage.js';
import {ChatForm} from 'Components/ChatForm/ChatForm.js';

import router from 'Services/router.js';
import {chatWebSocket} from 'Services/chatWebSocket.js';
import bus from "Services/bus.js";

const application = document.getElementById('application');

export class Chat extends View {
    render({authorised = false, ws = new chatWebSocket()}) {
        const outer = application;
        outer.innerHTML = '';

        this.ws = ws;

        const nameOfHeadline = 'Языковой чат';
        const headline = new Headline({size: 'h1', textContent: nameOfHeadline}).render();

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                this.ws.destroy();
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline);

        if (!authorised) {
            const needToLogin = new Headline({size: 'h1', textContent: 'Чтобы участвовать в беседе, зайдите в систему'}).render();
            outer.appendChild(needToLogin);
            return;
        }
        this.forHistory = document.createElement("div");
        this.forData = new ChatData().render();
        outer.appendChild(this.forHistory);
        outer.appendChild(this.forData);


        if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }

        bus.emit('get-history');

        
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

    _onhistoryloaded(data) {
        data.forEach(mes => {
            const message = new ChatMessage({author: 'partner', text: mes.message}).render();
            document.insertBefore(message, this.forHistory);
        });
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
