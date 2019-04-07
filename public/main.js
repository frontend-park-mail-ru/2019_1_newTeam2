import {RenderModule} from './services/render.js';
import {AuthModule} from './services/auth.js';
import {LeaderboardController} from "./controllers/LeaderboardController.js";

const application = document.getElementById('application');

const renderer = new RenderModule();
const auth = new AuthModule();

auth.isAuthorised()
.then( (res) => {
    let options = {
        logined: false
    };
    if (res.status === 200) {
        options['logined'] = true;
    }
    renderer.render(application, 'menu', options);
});