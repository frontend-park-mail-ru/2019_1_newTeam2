import {Login} from '/views/Login/Login.js';
import auth from '/models/AuthModel.js';
import bus from '/services/bus.js';
import validation from '/services/validation.js';
import router from '/services/router.js';


export class LoginController {
    index() {
        auth.logout();
        this.view = new Login();
        this.view.render();
        this._onlogin = () => {
            router.go('menu');
        };
        this._onformsubmitted = (profile) => {
            let passed = true;
            if (!validation.checkLogin(profile.username)) {
                setTimeout(bus.emit.bind(bus), 0 , 'wrong-login', profile);
                passed = false;
            }

            if (!validation.checkPassword(profile.password)) {
                setTimeout(bus.emit.bind(bus), 0 , 'wrong-password', profile);
                passed = false;
            }

            if(passed) {
                auth.login(profile);
            }
        };
        bus.on('login', this._onlogin);
        bus.on('login-form-submitted', this._onformsubmitted);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('login', this._onlogin);
        bus.off('login-form-submitted', this._onformsubmitted);
    }
}