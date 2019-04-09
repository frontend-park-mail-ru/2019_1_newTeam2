import router from './services/router.js';

import {LeaderboardController} from "./controllers/LeaderboardController.js";
import {MenuController} from "./controllers/MenuController.js";
import {ProfileController} from "./controllers/ProfileController.js";
import {LoginController} from "./controllers/LoginController.js";

import {Dictionaries} from './views/Dictionaries/Dictionaries.js';
import {Signup} from './views/Signup/Signup.js';
import {Cards} from './views/Cards/Cards.js';

const views = {
    '': MenuController,
    'menu': MenuController,
    'login': LoginController,
    'dictionaries/me': Dictionaries,
    'leaderboard': LeaderboardController,
    'signup': Signup,
    'cards/me': Cards,
    'profile/me': ProfileController
};

Object.entries(views).forEach(element => {
    router.register(element[0], views[element[0]]);
});

router.render();
