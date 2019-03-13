'use strict';

const pug = require('pug');

const template = `
p
    | ID: #{ID}
    br
    | Username:
    input(type="text" value=Username name="username")
    br
img(src=Avatar)`;
const templateGen = pug.compile(template);

import {Headline} from '../../Headline/Headline.js';
import {Icon} from '../../Icon/Icon.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';

export class ProfileEdit{
    render(options = {}) {
        const rendererProfileEdit = new RenderModule();
        const ajax = new AjaxModule();
        const application = document.getElementById('application');

        const outer = document.createElement('div');
        outer.classList.add('centered');

        let headline = new Headline({size: 'h1', textContent: 'Редактировать'});

        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                rendererProfileEdit.render(application, 'menu', {logined: true});
            }
        }).render());
        outer.appendChild(headline.render());
        let userData;

        ajax.doGet({
            path: 'users',
            body: {}
        })
        .then ((response) => {
            console.log(response);
            response.json()
            .then ((res) => {
                let info = document.createElement('div');
                info.innerHTML = templateGen({ID: res['id'], Username: res['username'], Avatar: res['Avatar']});
                userData = res;
                outer.appendChild(info);
            })
            .catch ((err) => {
                // catch
            })

        })
        .catch ((error) => {
            console.log(error.response);
            error.response.json()
            .catch (
                // catch the exception
            )
        });

        let edit = new Button({size: 'small', name: 'Сохранить'}).render();
        outer.appendChild(edit);

        edit.addEventListener('click', () => {
                const inputs = document.getElementsByTagName('input');

                const body = {
                    id: userData['id'],
                    username: document.getElementsByName("username")[0],
                    email: userData["email"],
                    password: userData["password"],
                    langID: userData["langID"],
                    pronounceOn: userData["pronounceOn"],
                    score: userData["score"],
                    path: userData["path"]
                };
                ajax.doPut({
                    path: 'users',
                    body: body
                }).then(
                    () => {
                        rendererProfileEdit.render(application, 'profile');
                    },
                    (err) => {
                        console.log("some shit happened: " + err);
                    }
                )
            }
        );


        return outer;
    }
}