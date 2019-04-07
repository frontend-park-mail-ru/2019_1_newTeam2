'use strict';

import {RenderModule} from "../../services/render.js";
import {Headline} from "../../components/Headline/Headline.js";
import {Pagination} from "../../services/Pagination/Pagination.js";
import {Table} from "../../components/Table/Table.js";
import {Icon} from "../../components/Icon/Icon.js";
import {Button} from "../../components/Button/Button.js";
import {AuthModule} from '../../services/auth.js';

const application = document.getElementById('application');

export class Leaderboard {
    render(options = {}) {
        const rendererLead = new RenderModule();

        const outer = document.createElement('div');

        const headGen = new Headline({textContent: 'Лидеры'});
        const head = headGen.render();
        outer.appendChild(head);

        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                let auth = new AuthModule();
                let options = {
                    logined: false
                };
                auth.isAuthorised()
                .then( (res) => {
                    if (res.status === 200) {
                        options['logined'] = true;
                    }
                    rendererLead.render(application, 'menu', options);
                });
            }
        }).render());
        const pagination = new Pagination();
        const table = new Table();
        let tableBefore = null;
        pagination.render()
            .then(
                (response) => {
                    response.json()
                        .then(
                        (res) =>
                        {
                            return res;
                        }
                    )
                        .then(
                            (res) => {
                                res.sort((l, r) => {return l.score < r.score;});
                                table.data = res;
                                outer.insertBefore(table.render(),tableBefore);
                            }
                        );
                }
            );
        const buttonPrev = new Button({
            size: 'pagination',
            name: '<',
            handler: () => {
                pagination.previousPage();
            }
        }).render();
        outer.appendChild(buttonPrev);
        tableBefore = buttonPrev;
        const buttonNext = new Button({
            size: 'pagination',
            name: '>',
            handler: () => {
                pagination.nextPage();
            }
        }).render();
        outer.appendChild(buttonNext);
        return outer;
    }
}