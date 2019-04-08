'use strict';

class RouterModule {
    constructor() {
        this.views = {};
        this.prevState = {
            'path': '',
            'options': {},
        };
        window.addEventListener('popstate', () => {
            this.render();
        })
    }

    register(path, view) {
        this.views[path] = view;
    }

    go(path, options = {}) {
        if (!(path in this.views)) {
            console.log("path is not registred");
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
            let pathname = window.location.pathname;
            pathname = pathname.substring(1, pathname.length);
            if (!(pathname in this.views)) {
                console.log("path is not registred");
                console.log(path);
                return;
            }
            currentState = {
                'path': pathname,
                'options': {},
            }
        }

        let controller = this.views[currentState['path']];
        let options = currentState['options'];
        if(this.currentController)
            this.currentController.preventAllEvents();
        this.currentController = new controller();
        this.currentController.index(options);
    }

}

export default new RouterModule();