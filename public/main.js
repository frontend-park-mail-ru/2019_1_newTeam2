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

import {Button} from './components/Button/Button.js';
import {Headline} from './components/Headline/Headline.js';

const application = document.getElementById('application');

function testButton() {
    application.innerHTML = "";
    const testButton = new Button({
        parent: application,
        textContent: "testButton",
    });
    testButton.render();

    const buttonBig = new Button({
        parent: application,
        textContent: "buttonBig",
        type: "buttonBig",
    });
    buttonBig.render();

    const buttonSmall = new Button({
        parent: application,
        textContent: "buttonSmall",
        type: "buttonSmall",
    });
    buttonSmall.render();
}

function testHeadline() {
    application.innerHTML = "";
    const testHeadline = new Headline({
        parent: application,
        textContent: "this is SPARTA...ups...Headline)",
    });
    testHeadline.render();

    const th6 = new Headline({
        parent: application,
        size: "h6",
        textContent: "this is h6",
    });
    th6.render();

    const th5 = new Headline({
        parent: application,
        size: "h5",
        textContent: "this is h5",
    });
    th5.render();

    const th4 = new Headline({
        parent: application,
        size: "h4",
        textContent: "this is h4",
    });
    th4.render();

    const th3 = new Headline({
        parent: application,
        size: "h3",
        textContent: "this is h3",
    });
    th3.render();

    const th2 = new Headline({
        parent: application,
        size: "h2",
        textContent: "this is h2",
    });
    th2.render();

    const th1 = new Headline({
        parent: application,
        size: "h1",
        textContent: "this is h1",
    });
    th1.render();
}

testButton();

import {InputComponent} from "./components/Input/Input.js";
import {GriseMerdeComponent} from "./components/GriseMerde/GriseMerde.js";

const inp = new InputComponent({
    name: "test-input",
    placeholder: "do not enter",
    type: "email"
});

const gris = new GriseMerdeComponent({
    inner: inp.render(),
    classes: "big-grise-merde"
});

document.body.appendChild(gris.render());
