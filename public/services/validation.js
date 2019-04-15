'use strict';

class ValidationModule {
    constructor() {
        this.loginRegExpr = /^[a-zA-Z0-9-_]+$/;
        this.passwordRegExpr = /^[a-zA-Z0-9-_]+$/;
        this.emailRegExpr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    findPathInArray(path, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].test(path)) {
                return i;
            }
        }
        return -1;
    }

    checkLogin(login) {
        return this.loginRegExpr.test(login);
    }

    checkPassword(password) {
        return this.passwordRegExpr.test(password);
    }

    checkEmail(email) {
        return this.emailRegExpr.test(email);
    }

}

export default new ValidationModule();