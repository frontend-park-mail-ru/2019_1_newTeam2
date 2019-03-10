'use strict';

import {RenderModule} from "../../../modules/render.js";
import {AjaxModule} from "../../../modules/ajax.js";
import {Headline} from "../../Headline/Headline.js";
import {GriseMerde} from "../../GriseMerde/GriseMerde.js";
import {Icon} from "../../Icon/Icon.js";
import {Button} from "../../Button/Button.js";

const application = document.getElementById('application');



export class Dictionaries {
    render() {
        const rendererDict = new RenderModule();

        const outer = document.createElement('div');
        const inner = document.createElement('div');
        inner.classList.add('tiles');

        const headGen = new Headline({textContent: 'Мои словари'});
        const head = headGen.render();
        outer.appendChild(head);
        outer.appendChild(new Icon({
            src: '../../../../home-icon.png',
            handler: () => {
                rendererDict.render(application, 'menu');
            }
        }).render());
        outer.appendChild(inner);

        const ajax = new AjaxModule();


        const onfulfilled = (response) => {
            function addDictHandler() {
                let back;
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
            response.json().then(
                (res) => {
                    res.forEach(
                        (dict) => {
                            const griseGen = new GriseMerde({
                                inner: dict['name'],
                                classes:'grise-centered small-grise-merde'
                            });
                            const grise = griseGen.render();
                            inner.appendChild(grise);
                    })
                });
        };

        ajax.doGet({
            path: '/dictionaries'
        }).then(
            onfulfilled,
            (error) => {
                console.log(error);
            }
        );

        return outer;
    }
}