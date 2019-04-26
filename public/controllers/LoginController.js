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
        
        bus.on('login', this._onlogin, this);
        bus.on('login-form-submitted', this._onformsubmitted, this);
    }

    _onlogin(res) {
        if (res.status == 200) {
            router.go('menu');
        } else {
            bus.emit('no-login');
        }
    }

    _onformsubmitted(profile) {
        let passed = true;
        if (!validation.checkLogin(profile.username)) {
            bus.emit('wrong-login', profile);
            passed = false;
        }

        if (!validation.checkPassword(profile.password)) {
            bus.emit('wrong-password', profile);
            passed = false;
        }

        if(passed) {
            auth.login(profile);
        }
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('login', this._onlogin);
        bus.off('login-form-submitted', this._onformsubmitted);
    }
}