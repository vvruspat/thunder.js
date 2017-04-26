class Model {
    
    constructor () {
        
        this.dataEvents = {};
        
        let proxy = new Proxy(this, {
            get: function (target, name) {
                return name in target ? target[name] : undefined;
            },
            set: function(obj, prop, value) {
                let oldValue = prop in obj ? obj[prop] : undefined;
                
                obj[prop] = value;
                this.trigger("data.changed", {
                    prop: prop,
                    oldValue: oldValue,
                    newValue: value
                });
                return true;
            }.bind(this)
        });
        
        return proxy;
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
        this.dataEvents[eventName].forEach((item, i, arr) => {
            if (item.callback === callback) {
                this.dataEvents[eventName].splice(i, 1);
            }
        });
    }
}

