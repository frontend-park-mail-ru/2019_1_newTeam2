import {Controller} from '/controllers/Controller.js';
import {Signup} from '/views/Signup/Signup.js';
import auth from '/models/AuthModel.js';
import bus from '/services/bus.js';
import validation from '/services/validation.js';
import router from '/services/router.js';
import {UserModel} from '/models/UserModel.js';


export class SignupController extends Controller {
    index() {
        auth.logout();
        this.view = new Signup();
        this.user = new UserModel();
        this.view.render();

        this.listeners = new Set ([
            ['user-created', this._onusercreated],
            ['signup-form-submitted', this._onformsubmitted],
        ]);

        super.subscribeAll();
    }

    _onusercreated() {
        router.go('menu');
    }

    _onformsubmitted(profile) {
        let passed = true;
        if(!validation.checkLogin(profile.username)) {
            bus.emit('wrong-login', profile);
            passed = false;
        }

        if(!validation.checkPassword(profile.password)) {
            bus.emit('wrong-password', profile);
            passed = false;
        }

        if(!validation.checkEmail(profile.email)) {
            bus.emit('wrong-email', profile);
            passed = false;
        }
        if(passed) {
            this.user.createUser(profile);
        }
    }
}