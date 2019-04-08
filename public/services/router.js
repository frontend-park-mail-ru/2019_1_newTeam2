class RouterModule {
    constructor() {
        this.views = {};
        this.application = document.getElementById('application');
        window.addEventListener('popstate', event => {
            this.render();
            /*
            this.go(pathname);*/
        })
        //window.onpopstate = this.render;
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
        history.pushState(stateObj,'', path);
        //history.back();
        this.render();
    }

    render() {
        console.log(history.state);
        let currentState = history.state;
        if (!currentState) {
            let pathname = window.location.pathname;
            pathname = pathname.substring(1, pathname.length);
            currentState = {
                'path': pathname,
                'options': {},
            };
            if (!(currentState['path'] in this.views)) {
                console.log("path is not registred");
                console.log(path);
                return;
            }
        }
        let view = this.views[currentState['path']];
        let options = currentState['options'];
        this.application.innerHTML = '';
        this.application.appendChild((new view()).render(options));
    }

}

export default new RouterModule();