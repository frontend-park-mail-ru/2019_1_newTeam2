'use strict';

import {RenderModule} from "../../../modules/render.js";
import {Headline} from "../../Headline/Headline.js";
import {Pagination} from "../../../modules/Pagination/Pagination.js";
import {Table} from "../../Table/Table.js";

const application = document.getElementById('application');

export class Leaderboard {
    render() {
        const rendererLead = new RenderModule();

        const outer = document.createElement('div');

        const pagination = new Pagination();
        const table = new Table();
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
                                table.data = res;
                                outer.appendChild(table.render());
                            }
                        );
                }
            );
        return outer;
    }
}