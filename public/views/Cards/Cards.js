'use strict';

import router from "../../services/router.js";
import {Headline} from "../../components/Headline/Headline.js";
import {Icon} from "../../components/Icon/Icon.js";
import ajax from '../../services/ajax.js';
import {GriseMerde} from "../../components/GriseMerde/GriseMerde.js";

export class Cards {
    render() {
        const outer = document.createElement('div');
        const inner = outer.cloneNode();
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

        const onfulfilled = (response) => {
            function addCardHandler() {
                router.go('menu');
            }
            const griseGen = new GriseMerde({
                classes:'grise-centered small-grise-merde'
            });
            const grise = griseGen.render();
            grise.firstChild.appendChild(new Icon({
                    src: '../../../../plus.png',
                    handler: addCardHandler
                }
            ).render());
            inner.appendChild(grise);

            const foreach = (dict) => {
                const griseGen = new GriseMerde({
                    inner: dict['name'],
                    classes: 'grise-centered small-grise-merde'
                });
                const grise = griseGen.render();
                inner.appendChild(grise);
            };

            const onreceive = (res) => {
                res.forEach(foreach)
            };

            response.json().then(onreceive);
        };

        ajax.doGet({
            path: `/dictionaries/${dictionaryId}/` // get one dict
        }).then(
            onfulfilled,
            (error) => {
                console.log(error);
            }
        );
        return outer;
    }
}