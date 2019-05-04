import router from '/services/router.js';

import {TrainingController} from '/controllers/TrainingController.js';
import {LeaderboardController} from '/controllers/LeaderboardController.js';
import {MenuController} from '/controllers/MenuController.js';
import {ProfileController} from '/controllers/ProfileController.js';
import {SignupController} from '/controllers/SignupController.js';
import {LoginController} from '/controllers/LoginController.js';
import {DictionaryController} from '/controllers/DictionaryController.js';
import {CardController} from '/controllers/CardController.js';
import {ChatController} from '/controllers/ChatController.js';
// import {IframeChat} from '/components/IframeChat/IframeChat.js';

// document.getElementsByTagName('body')[0].appendChild(new IframeChat().render());

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
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
    ['^training$', TrainingController],
    ['^chat$', ChatController]
]);


controllers.forEach((value) => {
    router.register(value[0], value[1]);
});

router.render();
