'use strict';

import {CookieModule} from './cookie.js';

export class AuthModule {
    isAuthorised() {
        let cookieMod = new CookieModule();

        let user_id = cookieMod.getCookie('user_id');

        if (user_id != '') {
            return true;
        } else {
            return false;
        }
    }

    checkAuthorisationOnServer() {
        // TODO ?
    }
}