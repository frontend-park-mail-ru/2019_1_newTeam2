import router from '/services/router.js';
import {Icon} from '/components/Icon/Icon.js';

const application = document.getElementById('application');

export class Error {
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