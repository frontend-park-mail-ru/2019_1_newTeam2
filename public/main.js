import {RenderModule} from './modules/render.js';
const application = document.getElementById('application');

let renderer = new RenderModule;

renderer.render(application, 'menu');