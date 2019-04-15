import router from "/services/router.js";
import {Headline} from "/components/Headline/Headline.js";
import {Icon} from "/components/Icon/Icon.js";

const application = document.getElementById('application');

export class Dictionary {
	render(options = {}) {
		application.innerHTML = '';

		application.appendChild(new Icon({
			src: '/static/home-icon.png',
			handler: () => {
				router.go('menu');
			}
		}).render());

		application.appendChild(new Headline({
			textContent: options.errorText
        }).render());
    }
}