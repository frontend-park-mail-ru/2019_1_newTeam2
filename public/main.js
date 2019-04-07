import router from './services/router.js';
import {AuthModule} from './services/auth.js';
import {LeaderboardController} from "./controllers/LeaderboardController.js";

import {Menu} from './views/Menu/Menu.js';
import {Login} from './views/Login/Login.js';
import {Dictionaries} from './views/Dictionaries/Dictionaries.js';
import {Leaderboard} from './views/Leaderboard/Leaderboard.js';
import {Signup} from './views/Signup/Signup.js';
import {Cards} from './views/Cards/Cards.js';
import {Profile} from './views/Profile/Profile.js';
import {ProfileEdit} from './views/ProfileEdit/ProfileEdit.js';

const views = {
    '': Menu,
    'menu': Menu,
    'login': Login,
    'dictionaries/me': Dictionaries,
    'leaderboard': Leaderboard,
    'signup': Signup,
    'profile/me/edit': ProfileEdit,
    'cards/me': Cards,
    'profile/me': Profile
};

Object.entries(views).forEach(element => {
    router.register(element[0], views[element[0]]);
});

/*let pathname = window.location.pathname;
pathname = pathname.substring(1, pathname.length);

router.go(pathname);*/
router.render();
