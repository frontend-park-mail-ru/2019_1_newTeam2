import {Signup} from "../views/Signup/Signup.js";
import auth from "../models/AuthModel.js";
import bus from "../services/bus.js"
import validation from "../services/validation.js";
import router from "../services/router.js";
import {UserModel} from "../models/UserModel.js";


export class SignupController {
    index() {
        auth.logout();
        this.view = new Signup();
        this.user = new UserModel();
        this.view.render();
        this._onusercreated = () => {
            router.go('login');
        };
        this._onformsubmitted = (profile) => {
            let passed = true;
            if(!validation.checkLogin(profile.username)) {
                setTimeout(bus.emit.bind(bus), 0 , 'wrong-login', profile);
                passed = false;
            }

            if(!validation.checkPassword(profile.password)) {
                setTimeout(bus.emit.bind(bus), 0 , 'wrong-password', profile);
                passed = false;
            }

            if(!validation.checkEmail(profile.email)) {
                setTimeout(bus.emit.bind(bus), 0 , 'wrong-email', profile);
                passed = false;
            }
            if(passed) {
                this.user.createUser(profile);
                // auth.login(profile);
            }
        };
        bus.on('user-created', this._onusercreated);
        bus.on('signup-form-submitted', this._onformsubmitted);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('user-created', this._onusercreated);
        bus.off('signup-form-submitted', this._onformsubmitted);
    }
}