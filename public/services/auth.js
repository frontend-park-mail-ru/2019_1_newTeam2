'use strict';

import {AjaxModule} from './ajax.js';
let ajaxAuth = new AjaxModule();

export class AuthModule {
    isAuthorised() {     
        return ajaxAuth.doGet({
            path: 'session/'
        });
    }

    logout() {
        ajaxAuth.doPatch({
            path: 'session/'
        });
    }
}