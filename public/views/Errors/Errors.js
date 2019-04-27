'use strict';

import {View} from '/views/View.js';
import router from '/services/router.js';
import {Icon} from '/components/Icon/Icon.js';

const application = document.getElementById('application');

export class Error extends View {
    render() {
        application.innerHTML = '';

        application.appendChild(new Icon({
            src: '/static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());

    }
}