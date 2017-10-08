class Memory {
    constructor () {
        this._store = {};
    }

    _getStore() {
        return this._store;
    }

    set(category, name, object) {
        if (!this._store[category]) {
            this._store[category] = {};
        }
        this._store[category][name] = object;
    }

    get(category, name) {
        return this._store[category][name];
    }
}

module.exports = Memory;