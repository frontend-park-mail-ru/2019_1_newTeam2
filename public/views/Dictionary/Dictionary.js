'use strict';

import router from "../../services/router.js";
import {Headline} from "../../components/Headline/Headline.js";
import {GriseMerde} from "../../components/GriseMerde/GriseMerde.js";
import {Icon} from "../../components/Icon/Icon.js";
import {Button} from "../../components/Button/Button.js";
import {Input} from "../../components/Input/Input.js";
import bus from "../../services/bus.js";

const application = document.getElementById('application');

export class Dictionary {
	render(options = {}) {
		application.innerHTML = '';
		const outer = application;
		const inner = document.createElement('div');
		inner.classList.add('tiles');
		application.innerHTML = '';
		application.appendChild(outer);

		const headGen = new Headline({textContent: 'Мои словари'});
		const head = headGen.render();
		outer.appendChild(head);
		outer.appendChild(new Icon({
			src: '../../static/home-icon.png',
			handler: () => {
				router.go('menu');
			}
		}).render());
		outer.appendChild(inner);

		const addButton = document.createElement('div');
		addButton.innerText = 'Add';
		addButton.addEventListener('click', (event) => {
			const input1 = new Input({
				id: 'input-dict-name',
				type: 'text',
				value: '',
				placeholder: '',
				maxlen: 50,
				label: '',
				disabled: '',
			}).render();
			const input2 = new Input({
				id: 'input-dict-description',
				type: 'text',
				value: '',
				placeholder: '',
				maxlen: 50,
				label: '',
				disabled: '',
			}).render();
			outer.appendChild(input1);
			outer.appendChild(input2);
			const submit = new Button({handler: () => {
					let dict = {};
					dict.name = input1.value;
					dict.description = input2.value;
					setTimeout(bus.emit.bind(bus), 0, 'new-dict-form-submitted', dict);
				}}).render();
			outer.appendChild(submit);
		});

		this._ondictsloaded = (dicts) => {
			dicts.forEach((dict) => {
				let div = document.createElement('div');
				div.innerText = `${dict.name} ${dict.description}`;
				// let link = document.createElement('span');
				// div.appendChild(link);
				// link.classList.add('hidden-element');
				// link.innerText = `${dict.id}`;
				inner.appendChild(div);
				div.addEventListener('click', (event) => {
					const id = dict.id;
					router.go('cards', {dictId: id});
				});
			});
		};

		this._ondictcreated = (dict) => {
			let div = document.createElement('div');
			div.innerText = `${dict.name} ${dict.description}`;
			// let link = document.createElement('span');
			// div.appendChild(link);
			// link.classList.add('hidden-element');
			// link.innerText = `${dict.id}`;
			inner.appendChild(div);
			div.addEventListener('click', (event) => {
				const id = dict.id;
				router.go('cards', {dictId: id});
			});
		};

		this._oncreatedicterror = () => {
			alert('Error during creation');
		};

		bus.on('dicts-loaded', this._ondictsloaded);
		bus.on('dict-created', this._ondictcreated);
		bus.on('create-dict-error', this._oncreatedicterror);

	}

	preventAllEvents() {
		bus.off('dicts-loaded', this._ondictsloaded);
		bus.off('dict-created', this._ondictcreated);
		bus.off('create-dict-error', this._oncreatedicterror);
	}
}