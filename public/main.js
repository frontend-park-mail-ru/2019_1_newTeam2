import {RenderModule} from './modules/render.js';
import {AuthModule} from './modules/auth.js';

const application = document.getElementById('application');

const renderer = new RenderModule();
const auth = new AuthModule();

auth.isAuthorised()
.then( (res) => {
    let options = {
        logined: false
    };
    if (res.status == 200) {
        options['logined'] = true;
    }
    renderer.render(application, 'menu', options);
});