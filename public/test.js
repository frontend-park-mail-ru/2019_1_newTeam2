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

function testTable() {
    const table1 = new Table();
    table1.data = [
        {
            "_id": "5c82aad90140f219a246bd36",
            "index": 0,
            "guid": "756efff9-2419-4d9c-99e8-4bbc75146107",
            "isActive": true,
            "balance": "$3,091.15",
            "picture": "http://placehold.it/32x32",
            "age": 39,
            "eyeColor": "brown",
            "company": "KNEEDLES"
        },
        {
            "_id": "5c82aad95dca06edacff448f",
            "index": 1,
            "guid": "fc7aaa32-b43d-4cd6-a8e5-107529482161",
            "isActive": true,
            "balance": "$1,807.79",
            "picture": "http://placehold.it/32x32",
            "age": 37,
            "eyeColor": "green",
            "company": "MAKINGWAY"
        },
        {
            "_id": "5c82aad919a5539c59ad9d40",
            "index": 2,
            "guid": "262886f0-1829-4fc6-b390-e4f99598d3b6",
            "isActive": true,
            "balance": "$3,580.73",
            "picture": "http://placehold.it/32x32",
            "age": 38,
            "eyeColor": "blue",
            "company": "NETUR"
        },
        {
            "_id": "5c82aad923f8a3034dbf07bd",
            "index": 3,
            "guid": "246ede6f-ed50-4799-9a31-b237de07d401",
            "isActive": true,
            "balance": "$2,429.78",
            "picture": "http://placehold.it/32x32",
            "age": 39,
            "eyeColor": "green",
            "company": "UNIA"
        },
        {
            "_id": "5c82aad91edf942dfd7a9546",
            "index": 4,
            "guid": "6a1cb46d-86a9-4eed-bd08-38db2a86311b",
            "isActive": true,
            "balance": "$3,572.67",
            "picture": "http://placehold.it/32x32",
            "age": 30,
            "eyeColor": "brown",
            "company": "RONELON"
        },
        {
            "_id": "5c82aad981cb344cb98cab5f",
            "index": 5,
            "guid": "c3ba5d69-5c7a-4a61-b0e3-c65f184ecf96",
            "isActive": true,
            "balance": "$3,884.36",
            "picture": "http://placehold.it/32x32",
            "age": 23,
            "eyeColor": "brown",
            "company": "QUAILCOM"
        },
        {
            "_id": "5c82aad93c7de820c87c778f",
            "index": 6,
            "guid": "1121d597-1d04-4e6f-9c28-ed359a1e519a",
            "isActive": false,
            "balance": "$1,831.82",
            "picture": "http://placehold.it/32x32",
            "age": 31,
            "eyeColor": "green",
            "company": "DEEPENDS"
        },
        {
            "_id": "5c82aad9955e5507d06c20bb",
            "index": 7,
            "guid": "065b59b4-d55d-4777-b0d1-2727040e014a",
            "isActive": false,
            "balance": "$2,992.91",
            "picture": "http://placehold.it/32x32",
            "age": 23,
            "eyeColor": "brown",
            "company": "ZIORE"
        }
    ];
    application.appendChild(table1.render());
}

testTable();
// testHeadline();
// testButton();
