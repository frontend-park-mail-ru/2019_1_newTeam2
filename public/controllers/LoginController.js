import {Controller} from '/controllers/Controller.js';
import {Login} from '/views/Login/Login.js';
import auth from '/models/AuthModel.js';
import bus from '/services/bus.js';
import validation from '/services/validation.js';
import router from '/services/router.js';


export class LoginController extends Controller {
    index() {
        auth.logout();
        this.view = new Login();
        this.view.render();

        this.listeners = new Set ([
            ['login', this._onlogin],
            ['login-form-submitted', this._onformsubmitted],
        ]);

        super.subscribeAll();
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
}