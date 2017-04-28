class EventListener {
    
    constructor (callback, isOneTime = false, scope = this) {
        this.callback = callback;
        this.onetime = isOneTime;
        this.scope = scope;
    }
    
    call (data) {
        this.callback.call(this.scope, data);
    }
    
    isOneTime () {
        return this.isOneTime;
    }
    
}