'use strict'

import {InputComponent} from '../Input/Input.js';

export class Menu {
    render() {
        const outer = document.createElement('div');
        
        const input = new InputComponent ({});
		outer.appendChild(input.render());

		return outer;
	}
}

