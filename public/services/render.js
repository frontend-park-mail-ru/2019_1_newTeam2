import {Menu} from '../views/Menu/Menu.js';
import {Login} from '../views/Login/Login.js';
import {Dictionaries} from "../views/Dictionaries/Dictionaries.js";
import {Leaderboard} from "../views/Leaderboard/Leaderboard.js";
import {Signup} from '../views/Signup/Signup.js';
import {Cards} from "../views/Cards/Cards.js";
import {Profile} from '../views/Profile/Profile.js';
import {ProfileEdit} from '../views/ProfileEdit/ProfileEdit.js';


const pages = {
    menu: Menu,
    login: Login,
    dictionaries: Dictionaries,
    leaderboard: Leaderboard,
    signup: Signup,
    profileEdit: ProfileEdit,
    cards: Cards,
    profile: Profile
};

export class RenderModule {
    render (application, item, options = {}) {
        application.innerHTML = '';
        const page = new pages[item]();
        application.appendChild(page.render(options));
    }
}
