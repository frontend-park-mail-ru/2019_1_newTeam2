'use strict';

import {View} from '/views/View.js';
import {Headline} from '/components/Headline/Headline.js';
import {Icon} from '/components/Icon/Icon.js';
import {Button} from '/components/Button/Button.js';
import {ChatData} from '/components/ChatData/ChatData.js';
import {ChatMessage} from '/components/ChatMessage/ChatMessage.js';

import router from '/services/router.js';

const application = document.getElementById('application');

export class Chat extends View {
    render({authorised = false}) {
        application.innerHTML = '';

        const outer = application;
        outer.innerHTML = '';

        let nameOfHeadline = authorised ? 'Языковой чат' : 'Анонимный языковой чат';
        let headline = new Headline({size: 'h1', textContent: nameOfHeadline});

        outer.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline.render());

        let forData = new ChatData().render();
        outer.appendChild(forData);

        forData.appendChild(new ChatMessage({author: 'me', text: 'HELLO'}).render());
        forData.appendChild(new ChatMessage({author: 'partner', text: 'WORD'}).render());



        
        let forInput = document.createElement('div');
        outer.appendChild(forInput);


        let send = new Button({type: 'secondary', name: 'Отправить'}).render();
        forInput.appendChild(send);
    }
}