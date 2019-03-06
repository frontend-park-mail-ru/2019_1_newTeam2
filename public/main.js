import {Icon} from './components/Icon/icon.js'
import {Checkbox} from './components/Checkbox/checkbox.js'
import {Link} from './components/Link/link.js'

const application = document.getElementById('application');

const icon = new Icon({ src: 'points.png' });
application.appendChild(icon.render());

const checkboxSmall = new Checkbox({ id: '0', size: 'small' });
application.appendChild(checkboxSmall.render());

const checkboxBig = new Checkbox({ id: '1', size: 'big' });
application.appendChild(checkboxBig.render());

const link = new Link({ name: 'link', size: 'h1' });
application.appendChild(link.render());
