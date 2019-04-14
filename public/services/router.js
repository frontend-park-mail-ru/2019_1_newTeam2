'use strict';
import validation from './validation.js';

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
        })
    }

    register(path, controller) {
        this.paths.push(new RegExp(path));
        this.controllers.push(controller);
    }

    go(path, options = {}) {
        let i = validation.findPathInArray(path, this.paths);
        if (i === -1) {
            console.log("path is not registered");
            console.log(path);
            return;
        }

        let stateObj = {
            'path': path,
            'options': options,
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
                console.log('path is not registered');
                console.log(currentPath);
                return;
            }
            currentState = {
                'path': currentPath,
                'options': {},
            }
        }

        let i = validation.findPathInArray(currentState['path'], this.paths);
        let controller = this.controllers[i];
        let options = currentState['options'];

        if (this.currentController) {
            this.currentController.preventAllEvents();
        }

        this.currentController = new controller();
        this.currentController.index(options);
    }

}

export default new RouterModule();