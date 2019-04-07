class RouterModule {
    constructor() {
        this.views = {};
        this.application = document.getElementById('application');
    }

    register(path, view) {
        this.views[path] = view;
    }

    go(path, options = {}) {
        if (!(path in this.views)) {
            console.log("path is not registred");
            return;
        }

        let stateObj = {
            path: path,
        };
        history.pushState(stateObj,'', path);

        this.render(path, options); 
    }

    render(path, options) {
        this.application.innerHTML = '';
        this.application.appendChild(this.views[path].render(options));
    }

}

export default new RouterModule();