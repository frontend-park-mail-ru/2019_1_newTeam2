'use strict';

import {AjaxModule} from './ajax.js';
let ajaxAuth = new AjaxModule();

export class AuthModule {
    isAuthorised() {     
        return ajaxAuth.doGet({
            path: 'https://ancient-bastion-96223.herokuapp.com/auth/'
            // path: '/auth/'
        });
    }

    logout() {
        ajaxAuth.doDelete({
            path: 'https://ancient-bastion-96223.herokuapp.com/auth/'
            // path: '/auth/'
        });
    }
}