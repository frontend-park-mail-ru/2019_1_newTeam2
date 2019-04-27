'use strict';


import {Icon} from "/components/Icon/Icon.js";

export class IframeChat {
	render () {
		const outer = document.createElement('div');

		const button = new Icon({
			src: '/static/plus.png',
			handler: () => {
				iframe.classList.toggle('hidden-element');
			}
		}).render();

		const iframe = document.createElement('iframe');
		iframe.src = '/chat';
		iframe.classList.add('hidden-element');

		outer.appendChild(button);
		outer.appendChild(iframe);
		return outer;
	}
}
