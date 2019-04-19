import router from '/services/router.js';

import {LeaderboardController} from '/controllers/LeaderboardController.js';
import {MenuController} from '/controllers/MenuController.js';
import {ProfileController} from '/controllers/ProfileController.js';
import {SignupController} from '/controllers/SignupController.js';
import {LoginController} from '/controllers/LoginController.js';
import {DictionaryController} from '/controllers/DictionaryController.js';
import {CardController} from '/controllers/CardController.js';

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
            // console.log(reg);
        })
        .catch((err) => {
            // console.log(err);
        });
}

const controllers = new Set([
    ['^$', MenuController],
    ['^menu$', MenuController],
    ['^login$', LoginController],
    ['^dictionaries/me$', DictionaryController],
    ['^leaderboard$', LeaderboardController],
    ['^signup$', SignupController],
    ['^dictionary$', CardController],
    ['^profile/me$', ProfileController],
    ['^dictionary/[0-9]+$', CardController],
]);


controllers.forEach((value) => {
    router.register(value[0], value[1]);
});

router.render();
