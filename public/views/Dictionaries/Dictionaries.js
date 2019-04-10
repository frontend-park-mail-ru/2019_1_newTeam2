'use strict';

import router from "../../services/router.js";
import ajax from '../../services/ajax.js';
import {Headline} from "../../components/Headline/Headline.js";
import {GriseMerde} from "../../components/GriseMerde/GriseMerde.js";
import {Icon} from "../../components/Icon/Icon.js";
import {Button} from "../../components/Button/Button.js";

const application = document.getElementById('application');


export class Dictionaries {
    index(options = {}) {
        const outer = document.createElement('div');
        const inner = outer.cloneNode();
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
                        router.go('menu');
                    };
                    const cardsButtonHandler = () => {
                        router.go('menu');
                    };
                    const importButton = new Button({type: 'secondary', name: 'Импорт', handler: importButtonHandler}).render();
                    const cardsButton = new Button({type: 'secondary', name: 'По картам', handler: cardsButtonHandler}).render();
                    dialog.appendChild(importButton);
                    dialog.appendChild(cardsButton);
                    outer.appendChild(back);
                }
                back.classList.remove('hidden');
            }
            const griseGen = new GriseMerde({
                size:'small'
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
                    size: 'small'
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
            path: 'dictionaries'
        }).then(
            onfulfilled,
            (error) => {
                console.log(error);
            }
        );
    }

    preventAllEvents() {

    }
}