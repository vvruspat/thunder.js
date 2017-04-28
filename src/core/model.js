class Model extends Base {

    /**
     * Model constructor
     * @param data Object
     * @returns {Proxy}
     */
    constructor(data) {

        super();

        Object.defineProperty(Model.prototype, 'hash', {
            value: '_' + Math.random().toString(36).substr(0, 10),
            writable: false
        });

        let proxy = new Proxy(this, {
            get: function (target, name) {
                return name in target ? target[name] : undefined;
            },
            set: function (obj, prop, value) {
                let oldValue = prop in obj ? obj[prop] : undefined;

                obj[prop] = value;
                this.trigger('model.modified', {
                    prop: prop,
                    oldValue: oldValue,
                    newValue: value
                });
                return true;
            }.bind(this)
        });

        data.forEach((key, value) => {
            this[key] = value;
        });

        return proxy;
    }

    destroy() {
        this.forEach((key, value) => {
            if (value instanceof Model) {
                value.destroy();
            }
        });
        super.destroy();
    }


}

