'use strict';

import ajax from './ajax.js';

export class AuthModule {
    isAuthorised() {     
        return ajax.doGet({
            path: 'session/'
        });
    }

    logout() {
        ajax.doPatch({
            path: 'session/'
        });
    }
}