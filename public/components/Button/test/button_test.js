import {Button} from './Button.js';
const application = document.getElementById('application');

(function testButton() {
    application.innerHTML = "";
    const testButton = new Button({
        name: "testButton",
    });
    application.appendChild(testButton.render());

    const buttonBig = new Button({
        name: "buttonBig",
        type: "primary",
    });
    application.appendChild(buttonBig.render());

    const buttonSmall = new Button({
        name: "buttonSmall",
        type: "secondary",
    });
    application.appendChild(buttonSmall.render());

    const buttonSquare = new Button({
        name: "+",
        type: "square",
    });
    application.appendChild(buttonSquare.render());
})();