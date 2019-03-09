'use strict'

import {Input} from '../Input/Input.js';

export class Menu {
    render() {
        const outer = document.createElement('div');
        
        const input = new Input ({});
		outer.appendChild(input.render());

		return outer;
	}
}

