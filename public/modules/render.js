import {Menu} from '../components/Pages/Menu/Menu.js';
import {Login} from '../components/Pages/Login/Login.js';
import {Dictionaries} from "../components/Pages/Dictionaries/Dictionaries.js";
import {Leaderboard} from "../components/Pages/Leaderboard/Leaderboard.js";
import {Signup} from '../components/Pages/Signup/Signup.js';
import {Cards} from "../components/Pages/Cards/Cards.js";
import {Profile} from '../components/Pages/Profile/Profile.js';
import {ProfileEdit} from '../components/Pages/ProfileEdit/ProfileEdit.js';


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
