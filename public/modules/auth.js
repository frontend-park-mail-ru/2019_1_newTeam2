'use strict';

import {CookieModule} from './cookie.js';
let cookieMod = new CookieModule();

export class AuthModule {
    isAuthorised() {        
        let user_id = cookieMod.getCookie('user_id');

        if (user_id != '') {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        setCookie('user_id','',-1);
    }

    checkAuthorisationOnServer() {
        // TODO ?
    }
}