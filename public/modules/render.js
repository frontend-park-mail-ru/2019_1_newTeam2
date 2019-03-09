import {Menu} from '../components/Pages/Menu/Menu.js';
import {Login} from '../components/Pages/Login/Login.js';
import {Dictionaries} from "../components/Pages/Dictionaries/Dictionaries.js";
import {Leaderboard} from "../components/Pages/Leaderboard/Leaderboard.js";
import {Signup} from '../components/Pages/Signup/Signup.js';


const pages = {
    menu: Menu,
    login: Login,
    dictionaries: Dictionaries,
    errorPage: Menu,
    leaderboard: Leaderboard,
    signup: Signup
};

export class RenderModule {
    render (application, item) {
        application.innerHTML = '';
        const page = new pages[item]();
        application.appendChild(page.render())
    }
}
