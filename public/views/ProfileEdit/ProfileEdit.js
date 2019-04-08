'use strict';

const pug = require('pug');

const template = `
p
    | ID: #{id}
    br
    | Username:
    input(type="text" value=username name="username")
    br
    | Email:
    input(type="email" value=email name="email")
    br
    input(type="file" value=file name="file")
img(src=baseUrl + path)`;
const templateGen = pug.compile(template);

import {Headline} from '../../components/Headline/Headline.js';
import {Icon} from '../../components/Icon/Icon.js';
import {Button} from '../../components/Button/Button.js';

import router from '../../services/router.js';
import {baseUrl} from '../../services/ajax.js';
import ajax from '../../services/ajax.js';

export class ProfileEdit{
    render(options = {}) {
        const outer = document.createElement('div');
        outer.classList.add('centered');

        let headline = new Headline({size: 'h1', textContent: 'Редактировать'});

        outer.appendChild(new Icon({
            src: '../../static/home-icon.png',
            handler: () => {
                router.go('menu');
            }
        }).render());
        outer.appendChild(headline.render());
        let userData;

        ajax.doGet({
            path: 'users/',
            body: {}
        })
        .then ((response) => {
            console.log(response);
            response.json()
            .then ((res) => {
                let info = document.createElement('div');
                // info.innerHTML = templateGen({ID: res['id'], Username: res['username'], Avatar: res['Avatar']});
                res.baseUrl = baseUrl;
                info.innerHTML = templateGen(res);
                userData = res;
                outer.appendChild(info);
            })
            .catch ((err) => {
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

        let edit = new Button({size: 'small', name: 'Сохранить'}).render();
        outer.appendChild(edit);

        edit.addEventListener('click', () => {
            let body = {
                id: userData['id'],
                username: document.getElementsByName('username')[0].value,
                email: userData['email'],
                password: userData['password'],
                langID: userData['langID'],
                pronounceOn: userData['pronounceOn'],
                score: userData['score'],
                path: userData['path']
            };
            const inputs = document.getElementsByTagName('input');
            Array.from(inputs).forEach(
                (input) => {
                    if (input.name === 'file') {
                        return;
                    }
                    body[`${input.name}`] = input.value;
                }
            );
            const fileUpload = document.getElementsByName('file')[0];
            if(fileUpload.value) {
                let formData = new FormData();
                formData.append("file", fileUpload.files[0]);
                ajax.uploadAvatar({
                    body: formData
                }).then(
                    () => {},
                    (err) => {console.log(err)}
                );
            }
            ajax.doPut({
                    path: 'users/',
                    body: body
                }).then(
                    () => {
                        router.go('profile/me');
                    },
                    (err) => {
                        console.log("some shit happened: " + err);
                    }
                );
            }
        );


        return outer;
    }
}