// Generic observable for the observer pattern
export default class Observable {

    constructor() {
        this._observers = [];

        this.registerObserver = this.registerObserver.bind(this);
        this.unregisterObserver = this.unregisterObserver.bind(this);
        this.notifyObservers = this.notifyObservers.bind(this);
    }

    registerObserver(observerFunction) {
        return this._observers.push(observerFunction);
    }

    unregisterObserver(observerId) {
        this._observers.splice(observerId, 1);
    }

    notifyObservers(extraObj) {
        for (const observerFunction of this._observers)
            observerFunction(extraObj);
    }

}