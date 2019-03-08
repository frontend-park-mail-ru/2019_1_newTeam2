import {Icon} from './components/Icon/Icon.js'
import {Checkbox} from './components/Checkbox/Checkbox.js'
import {Link} from './components/Link/Link.js'
import {Input} from "./components/Input/Input.js";
import {GriseMerde} from "./components/GriseMerde/GriseMerde.js";
import {Button} from './components/Button/Button.js';
import {Headline} from './components/Headline/Headline.js';
import {Pagination} from './components/Pagination/Pagination.js'
import {Table} from './components/Table/Table.js'
import {Upload} from './components/Upload/Upload.js'
import {Image} from './components/Image/Image.js'

const application = document.getElementById('application');


function testIcon() {
    const icon = new Icon({ src: 'points.png' });
    application.appendChild(icon.render());
}

function testCheckbox() {
    const checkboxSmall = new Checkbox({ id: '0', size: 'small' });
    application.appendChild(checkboxSmall.render());

    const checkboxBig = new Checkbox({ id: '1', size: 'big' });
    application.appendChild(checkboxBig.render());
}

function testLink() {
    const link = new Link({ name: 'link', size: 'h1' });
    application.appendChild(link.render());
}

function testButton() {
    const testButton = new Button({
        textContent: "testButton",
    });
    application.appendChild(testButton.render());

    const buttonBig = new Button({
        textContent: "buttonBig",
        type: "buttonBig",
    });
    application.appendChild(buttonBig.render());

    const func = () => {console.log("Test works");};
    const buttonSmall = new Button({
        textContent: "buttonSmallWithLog",
        type: "buttonSmall",
        someFunction: func
    });
    application.appendChild(buttonSmall.render());
}

function testHeadline() {
    const testHeadline = new Headline({
        textContent: "this is SPARTA...ups...Headline)",
    });
    application.appendChild(testHeadline.render());

    const th6 = new Headline({
        size: "h6",
        textContent: "this is h6",
    });
    application.appendChild(th6.render());

    const th5 = new Headline({
        size: "h5",
        textContent: "this is h5",
    });
    application.appendChild(th5.render());

    const func = () => {console.log("Test works");};
    const th4 = new Headline({
        someFunction: func,
        size: "h4",
        textContent: "this is h4 with log",
    });
    application.appendChild(th4.render());

    const th3 = new Headline({
        size: "h3",
        textContent: "this is h3",
    });
    application.appendChild(th3.render());

    const th2 = new Headline({
        size: "h2",
        textContent: "this is h2",
    });
    application.appendChild(th2.render());

    const th1 = new Headline({
        size: "h1",
        textContent: "this is h1",
    });
    application.appendChild(th1.render());
}

function testGriseMerdeWithInput() {
    const inp = new Input({
        name: "test-input",
        placeholder: "do not enter",
        type: "email"
    });

    const gris = new GriseMerde({
        inner: inp.render(),
        classes: "big-grise-merde"
    });

    application.appendChild(gris.render());
}
// testButton();
testHeadline();