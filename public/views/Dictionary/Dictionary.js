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

		application.appendChild(new Icon({
			src: '../../static/home-icon.png',
			handler: () => {
				router.go('menu');
			}
		}).render());

		application.appendChild(new Headline({
			textContent: 'Мои словари'
		}).render());

		const name = new Input({
			id: 'name',
			type: 'text',
			value: '',
			placeholder: 'Название словаря',
			maxlen: 50,
			label: '',
		}).render();
		name.classList.add('hidden-element');
		application.appendChild(name);

		const description = new Input({
			id: 'description',
			type: 'text',
			value: '',
			placeholder: 'Описание словаря',
			maxlen: 50,
			label: '',
		}).render();
		description.classList.add('hidden-element');
		application.appendChild(description);
		
		const submit = new Button({
			type: 'secondary',
			name: 'Сохранить',
			id: 'submit',
			is_hidden: 'hidden-element',
			handler: () => {
				document.getElementById('submit').classList.add('hidden-element');
				name.classList.add('hidden-element');
				description.classList.add('hidden-element');
				document.getElementById('plus').classList.remove('hidden-element');
				let dict = {};
				dict.name = document.getElementById('name').value;
				dict.description = document.getElementById('description').value;
				console.log(dict.name);
				console.log(dict.description);
				// setTimeout(bus.emit.bind(bus), 0, 'new-dict-form-submitted', dict);
				router.go('cards', dict);
			}
		}).render();
		application.appendChild(submit);

		let plus = new Icon({
			src: '../../static/plus.png',
			id: 'plus',
			handler: () => {
				document.getElementById('plus').classList.add('hidden-element');
				name.classList.remove('hidden-element');
				description.classList.remove('hidden-element');
				document.getElementById('submit').classList.remove('hidden-element');
			}
		}).render();
		application.appendChild(plus);

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

		const inner = document.createElement('div');
		inner.classList.add('tiles');
		application.appendChild(inner);

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