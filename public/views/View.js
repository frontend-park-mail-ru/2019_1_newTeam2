import bus from 'Services/bus.js';

export class View {
    subscribeAll(){
        if (!this.listeners) {
            return;
        }

        this.listeners.forEach(listener => {
            bus.on(listener[0], listener[1], this);
        });
    }

    preventAllEvents(){
        if (!this.listeners) {
            return;
        }

        this.listeners.forEach(listener => {
            bus.off(listener[0], listener[1]);
        });
    }
}