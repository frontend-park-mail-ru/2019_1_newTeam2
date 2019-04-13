'use strict';

import ajax from '../services/ajax.js';
import bus from "../services/bus.js";

class AuthModel {
    isAuthorised() {
        ajax.doGet({
            path: 'session/'
        })
            .then(
                (res) => {
                    if(res.status === 200)
                        setTimeout(bus.emit.bind(bus), 0 , 'logged-in', res);
                    else
                        setTimeout(bus.emit.bind(bus), 0 , 'logged-out');
                },
                (err) => {
                    setTimeout(bus.emit.bind(bus), 0 , 'logged-out');
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
            .then(
                (res) => {
                    setTimeout(bus.emit.bind(bus), 0 , 'login', res);
                },
                (err) => {
                    console.log(err);
                    setTimeout(bus.emit.bind(bus), 0 , 'no-login');
                }
            );
    }
}

export default new AuthModel();