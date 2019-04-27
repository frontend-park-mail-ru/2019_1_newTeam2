'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';
import {ChatData} from '/components/ChatData/ChatData.js';
import {ChatMessage} from '/components/ChatMessage/ChatMessage.js';
import ws from '/services/webSocket.js';

import router from '/services/router.js';

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

        
        const forInput = document.createElement('div');
        outer.appendChild(forInput);


        let send = new Button({type: 'secondary', name: 'Отправить'}).render();
        forInput.appendChild(send);
        this.listeners = new Set([
            ['ws-message-received', this._onmessagereceived],
        ]);
        super.subscribeAll();
    }

    _onmessagereceived(text) {
        this.forData.appendChild(new ChatMessage({author: 'partner', text: text}).render());
    }

}