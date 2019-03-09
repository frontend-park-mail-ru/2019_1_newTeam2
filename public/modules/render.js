import {Menu} from '../components/Pages/Menu/Menu.js';
import {Login} from '../components/Pages/Login/Login.js';
import {Signup} from '../components/Pages/Signup/Signup.js';

const pages = {
    menu: Menu,
    login: Login,
    signup: Signup
};

export class RenderModule{
    render (application, item) {
        application.innerHTML = '';
        const page = new pages[item]();
        application.appendChild(page.render())
    }
}
