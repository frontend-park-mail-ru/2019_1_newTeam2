'use strict';

import {CookieModule} from './cookie.js';
//import {AjaxModule} from './ajax.js';
let cookieMod = new CookieModule(); 
//let ajaxAuth = new AjaxModule();

export class AuthModule {
    isAuthorised() {        
        let user_id = cookieMod.getCookie('user_id');
        console.log(user_id)

        if (user_id != '') {
            return true;
        } else {
            return false;
        }

        /*ajaxAuth.doGet({
            path: 'http://localhost:8090/auth/'
        }) 
        .then ((response) => { 
            // туть говорим дa
        })
        .catch (() => {

        });*/

    }

    logout() {
        cookieMod.setCookie('user_id','',-1);
    }

    checkAuthorisationOnServer() {
        // TODO ?
    }
}