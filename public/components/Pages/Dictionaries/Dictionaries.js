'use strict';

import {RenderModule} from "../../../modules/render.js";
import {AjaxModule} from "../../../modules/ajax.js";
import {Headline} from "../../Headline/Headline.js";
import {GriseMerde} from "../../GriseMerde/GriseMerde.js";
import {Icon} from "../../Icon/Icon.js";

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
            const handler = () => {
                rendererDict.render(application, 'dictionariesAdd');
            };
            const griseGen = new GriseMerde({
                inner: new Icon({
                    src: '../../../../plus.png',
                    handler: handler
                }
            ).render(),
                classes:'grise-centered small-grise-merde'
            });
            const grise = griseGen.render();
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
                rendererDict.render(application, 'errorPage');
            }
        );

        return outer;
    }
}