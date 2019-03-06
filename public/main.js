'use strict';

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
