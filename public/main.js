'use strict';

import {InputComponent} from "./components/Input/Input.js";
import {GriseMerdeComponent} from "./components/GriseMerde/GriseMerde.js";

const inp = new InputComponent({
    name: "test-input",
    placeholder: "do not enter"
});
const gris = new GriseMerdeComponent({
    innerHTML: inp.render(),
    classes: "big"
});

document.body.innerHTML = gris.render();
