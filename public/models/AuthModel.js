'use strict';

import ajax from 'Services/ajax.js';
import bus from 'Services/bus.js'; 

class AuthModel {
    isAuthorised() {
        ajax.doGet({
            path: 'session/'
        })
            .then((res) => {
                if(res.status === 200) {
                    bus.emit('logged-in', res);
                    console.log('logged-in');
                } else {
                    bus.emit('logged-out');
                    console.log('logged-out');
                }
            })
            .catch(() => {
                bus.emit('logged-out');
            });
    }

    logout() {
        ajax.doPatch({
            path: 'session/'
        });
    }

    login(profile) {
        ajax.doPost({
            path: 'session/',
            body: profile
        })
            .then( (res) => {
                bus.emit('login', res);
            })
            .catch((err) => {
                // TODO(gleensande): обработка ошибки
                console.log(err);
                bus.emit('no-login');
            });
    }
}

export default new AuthModel();