'use strict';

const pug = require('pug');

const template = `
p 
    | ID: #{id}
    br
    | Username: #{username}
    br
    | Email: #{email}
img(src=baseUrl + path)`;
const templateGen = pug.compile(template);

import {Headline} from '../../components/Headline/Headline.js';
import {Icon} from '../../components/Icon/Icon.js';
import {Button} from '../../components/Button/Button.js';

import router from '../../services/router.js';
import {baseUrl} from '../../services/ajax.js';
import ajax from '../../services/ajax.js';

export class Profile{
    render(options = {}) {
        const outer = document.createElement('div');
        outer.classList.add('centered');

        let headline = new Headline({size: 'h1', textContent: 'Мой профиль'});

        outer.appendChild(new Icon({
            src: '../../static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline.render());

        ajax.doGet({
            path: 'users/'
        })
        .then ((response) => {
            console.log(response);
            response.json()
            .then ((res) => {
                let info = document.createElement('div');
                // info.innerHTML = templateGen({ID: res['id'], Username: res['username'], Avatar: res['Avatar']});
                res.baseUrl = baseUrl;
                info.innerHTML = templateGen(res);
                outer.appendChild(info);
            })
            .catch (
                (err) => {
                console.log(err);
            })

        })
        .catch ((error) => {
            console.log(error.response);
            error.response.json()
            .catch (
                (err) => {
                    console.log(err);
                }
            )
        });

        let edit = new Button({size: 'small', name: 'Редактировать'}).render();
        outer.appendChild(edit);

        edit.addEventListener('click', () => {
                router.go('profile/me/edit');
            }
        );

        return outer;
    }
}