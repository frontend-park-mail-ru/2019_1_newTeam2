'use strict';

import ajax from './ajax.js';

class AuthModule {
    async isAuthorised() {
        let result;
        try {
            result = await ajax.doGet({
                path: 'session/'
            });
        } catch (e) {
            console.log("Can't GET backend/session");
            return false;
        }
        console.log(result.status);
        return (result.status === '200');
    }

    logout() {
        ajax.doPatch({
            path: 'session/'
        });
    }
}

export default new AuthModule();