class Base {

    constructor () {
        this.dataEvents = {};
    }

    trigger (eventName, data) {
        if (eventName in this.dataEvents) {
            this.dataEvents[eventName].forEach((item, i, arr) => {
                item.call(data);
                if (item.isOneTime() === true) {
                    arr.slice(i, 1);
                }
            });
        }
    }

    on (eventName, callback, scope, onetime = false) {
        if (!this.dataEvents[eventName]) {
            this.dataEvents[eventName] = [];
        }
        this.dataEvents[eventName].push(new EventListener(callback, onetime, scope));
    }

    one (eventName, callback, scope) {
        this.on(eventName, callback, scope, true);
    }

    off (eventName, callback) {
        this.dataEvents[eventName].forEach((item, i) => {
            if (item.callback === callback) {
                this.dataEvents[eventName].splice(i, 1);
            }
        });
    }

    destroy () {
        delete this.dataEvents;
    }

}