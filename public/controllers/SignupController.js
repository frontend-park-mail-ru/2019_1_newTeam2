import {Controller} from 'Controllers/Controller.js';
import {Signup} from 'Views/Signup/Signup.js';
import auth from 'Models/AuthModel.js';
import bus from 'Services/bus.js';
import validation from 'Services/validation.js';
import router from 'Services/router.js';
import {UserModel} from 'Models/UserModel.js';


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