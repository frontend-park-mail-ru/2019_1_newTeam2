'use strict';
import validation from './validation.js';
import {Error404Controller} from 'Controllers/Error404Controller.js';

class RouterModule {
    constructor() {
        this.controllers = [];
        this.paths = [];

        this.prevState = {
            'path': '',
            'options': {},
        };
        
        window.addEventListener('popstate', () => {
            this.render();
        });

        this.error404Controller = new Error404Controller();
    }

    register(path, controller) {
        this.paths.push(new RegExp(path));
        this.controllers.push(controller);
    }

    go(path) {
        let i = validation.findPathInArray(path, this.paths);
        if (i === -1) {
            this.currentController = this.error404Controller;
            let options = {'path': path};
            this.currentController.index(options);
            return;
        }

        let stateObj = {
            'path': path
        };

        history.pushState(stateObj,'', '/' + path);
        this.render();
    }

    render() {
        let currentState = history.state;

        if (!currentState) {
            let currentPath = window.location.pathname;
            currentPath = currentPath.substring(1, currentPath.length);
            let i = validation.findPathInArray(currentPath, this.paths);
            if (i === -1) {
                this.currentController = this.error404Controller;
                let options = {'path': currentPath};
                this.currentController.index(options);
                
                return;
            }
            currentState = {
                'path': currentPath
            };
        }

        let i = validation.findPathInArray(currentState['path'], this.paths);
        let controller = this.controllers[i];

        if (this.currentController) {
            this.currentController.preventAllEvents();
        }

        this.currentController = new controller();

        let options = {'path': currentState['path']};
        this.currentController.index(options);
    }

    back() {
        window.history.back();
    }

}

export default new RouterModule();
