import {Icon} from "/components/Icon/Icon.js";
import {Headline} from "/components/Headline/Headline.js";
import router from '/services/router.js';
import bus from '/services/bus.js';
import {Link} from "/components/Link/Link.js";
import {GriseMerde} from "/components/GriseMerde/GriseMerde.js";

const application = document.getElementById('application');

export class Training {
	render(options = {}) {
		application.innerText = '';

		application.appendChild(new Icon({
			src: '/static/home-icon.png',
			handler: () => {
				router.go('menu');
			}
		}).render());


		const outer = document.createElement('div');
		application.appendChild(outer);

		this._ondictsloaded = (dicts) => {
			dicts.forEach((dict) => {
				const link = new Link({
					size: 'h6',
					name: dict.name,
					handler: () => {
						bus.emit('dict-selected', dict.id);
					}
				}).render();
				outer.appendChild(link);
			});
		};

		bus.on('dicts-loaded', this._ondictsloaded);

		this._ongamecardsloaded = (cards) => {
			let result = [];
			const pageGenerator = function*() {
				// TODO(Alex): extract to component
				for(let index = 0; index < cards.length; ++index) {
					const card = cards[index];
					const inner = document.createElement('div');
					const word = new GriseMerde({
						size: 'big',
						inner: card.word
					}).render();
					inner.appendChild(word);
					card.variants.forEach((variant, index) => {
						const onchoose = () => {
							if (index === card.correct) {
								result.push({correct: true, id: card.id});
							} else {
								result.push({correct: false, id: card.id});
							}
							let page = pageGenerator.next();
							if (!page.done) {
								outer.innerText = '';
								outer.appendChild(page.value);
							} else {
								bus.emit('training-finished', result);
							}
						};
						const choice = new Link({
							size: 'h4',
							name: variant,
							handler: onchoose
						}).render();
						inner.appendChild(choice);
					});
					yield inner;
				}
			}();
			let page = pageGenerator.next();
			if (!page.done) {
				outer.innerText = '';
				outer.appendChild(page.value);
			} else {
				bus.emit('training-finished', result);
			}
		};
		bus.on('game-cards-loaded', this._ongamecardsloaded);
	}

	preventAllEvents() {
		bus.off('dicts-loaded', this._ondictsloaded);
		bus.off('game-cards-loaded', this._ongamecardsloaded);
	}
}