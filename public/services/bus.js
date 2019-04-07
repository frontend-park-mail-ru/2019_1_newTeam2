class EventBus {
    constructor() {
        this.listeners = {}
    }

    on(event, callback)
    {
        if(!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event, callback)
    {
        this.listeners[event] = this.listeners[event].filter(c => c!==callback)
    }

    emit(event, data)
    {
        this.listeners[event].forEach(l => l(data))
    }
}

export default new EventBus();