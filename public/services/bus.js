'use strict';

/**
 * Module EventBus
 * 
 * @class 
 * @classdesc a module-mediator for sending and getting events messages
 * 
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback, context = this) {
        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({
            callback: callback,
            context: context
        });
    }

    off(event, callback) {
        this.listeners[event] = this.listeners[event].filter(listener => 
            listener.callback !== callback
        );
    }

    emit(event, data) {
        if(this.listeners[event]) {
            this.listeners[event].forEach(listener => {
                Promise.resolve(listener.callback.bind(
                    listener.context,
                    data
                )());
            });
        }
    }
}

export default new EventBus();