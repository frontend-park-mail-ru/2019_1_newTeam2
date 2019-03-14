'use strict';

import {RenderModule} from "../../../modules/render.js";
import {Headline} from "../../Headline/Headline.js";
import {Icon} from "../../Icon/Icon.js";
import {AjaxModule} from "../../../modules/ajax.js";
import {GriseMerde} from "../../GriseMerde/GriseMerde.js";

const application = document.getElementById('application');

export class Cards {
    render() {
        const rendererCards = new RenderModule();
        const outer = document.createElement('div');
        const inner = outer.cloneNode();
        inner.classList.add('tiles');

        const headGen = new Headline({textContent: 'Мои словари'});
        const head = headGen.render();
        outer.appendChild(head);
        outer.appendChild(new Icon({
            src: '../../../../home-icon.png',
            handler: () => {
                rendererCards.render(application, 'menu');
            }
        }).render());
        outer.appendChild(inner);

        const ajax = new AjaxModule();

        const onfulfilled = (response) => {
            function addCardHandler() {
                rendererCards.render(application, 'menu');
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
            path: `/dictionaries/${dictionaryId}` // get one dict
        }).then(
            onfulfilled,
            (error) => {
                console.log(error);
            }
        );
        return outer;
    }
}