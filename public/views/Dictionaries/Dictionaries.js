'use strict';

import {RenderModule} from "../../services/render.js";
import ajax from '../../services/ajax.js';
import {Headline} from "../../components/Headline/Headline.js";
import {GriseMerde} from "../../components/GriseMerde/GriseMerde.js";
import {Icon} from "../../components/Icon/Icon.js";
import {Button} from "../../components/Button/Button.js";

const application = document.getElementById('application');


export class Dictionaries {
    render(options = {}) {
        const rendererDict = new RenderModule();
        const outer = document.createElement('div');
        const inner = outer.cloneNode();
        inner.classList.add('tiles');

        const headGen = new Headline({textContent: 'Мои словари'});
        const head = headGen.render();
        outer.appendChild(head);
        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                rendererDict.render(application, 'menu', {logined: true});
            }
        }).render());
        outer.appendChild(inner);

        const onfulfilled = (response) => {
            let back;
            function addDictHandler() {
                if(!back) {
                    let dialog = document.createElement('div');
                    back = dialog.cloneNode();
                    back.appendChild(dialog);
                    back.classList.add('grey-background');
                    back.addEventListener('click',() => {
                        back.classList.add('hidden');
                    });
                    dialog.classList.add('dialog');
                    const importButtonHandler = () => {
                        rendererDict.render(application,'menu');
                    };
                    const cardsButtonHandler = () => {
                        rendererDict.render(application,'menu');
                    };
                    const importButton = new Button({size: 'small', name: 'Импорт', handler: importButtonHandler}).render();
                    const cardsButton = new Button({size: 'small', name: 'По картам', handler: cardsButtonHandler}).render();
                    dialog.appendChild(importButton);
                    dialog.appendChild(cardsButton);
                    outer.appendChild(back);
                }
                back.classList.remove('hidden');
            }
            const griseGen = new GriseMerde({
                classes:'grise-centered small-grise-merde'
            });
            const grise = griseGen.render();
            grise.firstChild.appendChild(new Icon({
                    src: '../../../../plus.png',
                    handler: addDictHandler
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
            path: '/dictionaries/me/'
        }).then(
            onfulfilled,
            (error) => {
                console.log(error);
            }
        );

        return outer;
    }
}