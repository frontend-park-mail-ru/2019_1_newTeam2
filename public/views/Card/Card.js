'use strict';

import router from "../../services/router.js";
import {Headline} from "../../components/Headline/Headline.js";
import {Icon} from "../../components/Icon/Icon.js";
import {GriseMerde} from "../../components/GriseMerde/GriseMerde.js";
import bus from "../../services/bus.js";

const application = document.getElementById('application');

export class Card {
    render(options = {}) {
        application.innerHTML = '';
        const outer = application;
        const inner = document.createElement('div');
        inner.classList.add('tiles');

        const headGen = new Headline({textContent: 'Мои словари'});
        const head = headGen.render();
        outer.appendChild(head);
        outer.appendChild(new Icon({
            src: '../../../../home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(inner);

        this._oncardsloaded = () => {

		};

        this._oncardloaded = () => {

		};

        this._onloadcarderror = () => {

		};

        this._oncardcreated = () => {

		};

        this._oncreatecarderror = () => {

		};

        this._oncardupdated = () => {

		};

        this._onupdatecarderror = () => {

		};

        this._oncarddeleted = () => {

		};

        this._ondeletecarderror = () => {

		};

		bus.on('cards-loaded', this._oncardsloaded);
		bus.on('card-loaded', this._oncardloaded);
		bus.on('load-card-error', this._onloadcarderror);
		bus.on('card-created', this._oncardcreated);
		bus.on('create-card-error', this._oncreatecarderror);
		bus.on('card-updated', this._oncardupdated);
		bus.on('update-card-error', this._onupdatecarderror);
		bus.on('card-deleted', this._oncarddeleted);
		bus.on('delete-card-error', this._ondeletecarderror);
    }

    preventAllEvents() {
		bus.off('cards-loaded', this._oncardsloaded);
		bus.off('card-loaded', this._oncardloaded);
		bus.off('load-card-error', this._onloadcarderror);
		bus.off('card-created', this._oncardcreated);
		bus.off('create-card-error', this._oncreatecarderror);
		bus.off('card-updated', this._oncardupdated);
		bus.off('update-card-error', this._onupdatecarderror);
		bus.off('card-deleted', this._oncarddeleted);
		bus.off('delete-card-error', this._ondeletecarderror);
	}
}