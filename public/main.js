import router from './services/router.js';
import {AuthModule} from './services/auth.js';

import {Menu} from './views/Menu/Menu.js';
import {Login} from './views/Login/Login.js';
import {Dictionaries} from './views/Dictionaries/Dictionaries.js';
import {Leaderboard} from './views/Leaderboard/Leaderboard.js';
import {Signup} from './views/Signup/Signup.js';
import {Cards} from './views/Cards/Cards.js';
import {Profile} from './views/Profile/Profile.js';
import {ProfileEdit} from './views/ProfileEdit/ProfileEdit.js';

const auth = new AuthModule();

const views = {
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
    router.register(element[0], new views[element[0]]);
});

auth.isAuthorised()
.then( (res) => {
    let options = {
        logined: false
    };
    if (res.status === 200) {
        options['logined'] = true;
    }
    router.go('menu', options);
});