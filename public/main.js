import router from './services/router.js';

import {LeaderboardController} from "./controllers/LeaderboardController.js";
import {MenuController} from "./controllers/MenuController.js";

import {Login} from './views/Login/Login.js';
import {Dictionaries} from './views/Dictionaries/Dictionaries.js';
import {Signup} from './views/Signup/Signup.js';
import {Cards} from './views/Cards/Cards.js';
import {Profile} from './views/Profile/Profile.js';
import {ProfileEdit} from './views/ProfileEdit/ProfileEdit.js';

const views = {
    '': MenuController,
    'menu': MenuController,
    'login': Login,
    'dictionaries/me': Dictionaries,
    'leaderboard': LeaderboardController,
    'signup': Signup,
    'profile/me/edit': ProfileEdit,
    'cards/me': Cards,
    'profile/me': Profile
};

Object.entries(views).forEach(element => {
    router.register(element[0], views[element[0]]);
});

router.render();
