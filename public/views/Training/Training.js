import {Icon} from "/components/Icon/Icon.js";
import {Headline} from "/components/Headline/Headline.js";
import router from '/services/router.js';
import bus from '/services/bus.js';
import {Link} from "/components/Link/Link.js";
import {GriseMerde} from "/components/GriseMerde/GriseMerde.js";
import {Button} from "/components/Button/Button.js";
import {Pagination} from "/components/pagination.js";

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
		outer.classList.add('training-outer');
		this._ondictsloaded = (dicts) => {
			outer.innerText = '';
			dicts.forEach((dict) => {
				const link = new Link({
					size: 'h2',
					name: dict.name,
					handler: () => {
						bus.emit('dict-selected', dict.id);
					}
				}).render();
				outer.appendChild(link);
			});
			const pagination = new Pagination();
			pagination.render(outer);
		};

		bus.on('dicts-loaded', this._ondictsloaded);

		this._ongamecardsloaded = (cards) => {
			let result = [];

			const genNextPage = () => {
				let page = pageGenerator.next();
				if (!page.done) {
					outer.innerText = '';
					outer.appendChild(page.value);
				} else {
					outer.innerText = '';
					let guessedRight = 0;
					result.forEach((item) => {
						if(item.correct) {
							++guessedRight;
						}
					});
					const head = new Headline({
						textContent: 'Ваш результат: ' + guessedRight + '/' + cards.length,
						size: 'h3',
					}).render();
					outer.appendChild(head);
					const menuButton = new Button({
						size: 'small',
						name: 'Вернуться в меню',
						handler: () => {
							router.go('menu');
						}
					}).render();
					outer.appendChild(menuButton);
					bus.emit('training-finished', result);
				}
			};

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
							genNextPage();
						};

						const choice = new Link({
							size: 'h3',
							name: variant,
							handler: onchoose
						}).render();
						inner.appendChild(choice);
					});

					yield inner;
				}
			}();
			genNextPage();
		};
		bus.on('game-cards-loaded', this._ongamecardsloaded);
	}

	preventAllEvents() {
		bus.off('dicts-loaded', this._ondictsloaded);
		bus.off('game-cards-loaded', this._ongamecardsloaded);
	}
}