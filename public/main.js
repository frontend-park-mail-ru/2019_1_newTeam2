import {RenderModule} from './modules/render.js';
const application = document.getElementById('application');

const renderer = new RenderModule();

renderer.render(application, 'menu');