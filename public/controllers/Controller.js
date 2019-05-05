import bus from 'Services/bus.js';

export class Controller {
    subscribeAll(){
        if (!this.listeners) {
            return;
        }

        this.listeners.forEach(listener => {
            bus.on(listener[0], listener[1], this);
        });
    }

    preventAllEvents(){
        this.view.preventAllEvents();

        if (!this.listeners) {
            return;
        }

        this.listeners.forEach(listener => {
            bus.off(listener[0], listener[1]);
        });
    }
}