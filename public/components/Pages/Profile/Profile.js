'use strict';
const pug = require('pug');

const template = `p ID: #{ID} <br/> Username: #{Username} <br/>
img(src=Avatar)`;
const templateGen = pug.compile(template);

import {Headline} from '../../Headline/Headline.js';
import {Icon} from '../../Icon/Icon.js';
import {Button} from '../../Button/Button.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';

export class Profile{
    render(options = {}) {
        const rendererProfile = new RenderModule();
        const ajax = new AjaxModule();
        const application = document.getElementById('application');

        const outer = document.createElement('div');
        outer.classList.add('centered');

        let headline = new Headline({size: 'h1', textContent: 'Мой профиль'});

        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                rendererProfile.render(application, 'menu', {logined: true});
            }
        }).render());
        outer.appendChild(headline.render());

        ajax.doGet({
            path: 'https://ancient-bastion-96223.herokuapp.com/users/me/'
            // path: '/users/me/'
        })
        .then ((response) => {
            console.log(response);
            response.json()
            .then ((res) => {
                let info = document.createElement('div');
                info.innerHTML = templateGen({ID: res['id'], Username: res['username'], Avatar: res['Avatar']});
                outer.appendChild(info);
            })
            .cath ((err) => {
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

        let edit = new Button({size: 'small', name: 'Редактировать'});
        edit = edit.render();
        outer.appendChild(edit);

        edit.addEventListener('click', () => {
                rendererProfile.render(application, 'profileEdit');
            }
        );


        return outer;
    }
}