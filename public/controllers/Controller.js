import bus from '/services/bus.js';

export class Controller {
    subscribeAll(){
        this.listeners.forEach(listener => {
            bus.on(listener[0], listener[1], this);
        });
    }

    preventAllEvents(){
        this.view.preventAllEvents();
        this.listeners.forEach(listener => {
            bus.off(listener[0], listener[1]);
        });
    }
}