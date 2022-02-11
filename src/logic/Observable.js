/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

/**
 * A generic implementation of an observable for the observer pattern.
 */
export default class Observable {

    constructor() {
        this._observers = [];

        this.registerObserver = this.registerObserver.bind(this);
        this.unregisterObserver = this.unregisterObserver.bind(this);
        this.notifyObservers = this.notifyObservers.bind(this);
    }

    registerObserver(observerFunction) {
        return this._observers.push(observerFunction) - 1;
    }

    unregisterObserver(observerId) {
        this._observers.splice(observerId, 1);
    }

    notifyObservers(extraObj) {
        for (const observerFunction of this._observers)
            observerFunction(extraObj);
    }

}