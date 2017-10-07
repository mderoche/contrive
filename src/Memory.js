class Memory {
    constructor () {
        this._store = {};
    }

    _getStore() {
        return this._store;
    }

    set(category, name, object) {
        if (!this._getStore()[category]) {
            this._getStore()[category] = {};
        }
        this._getStore()[category][name] = object;
    }

    get(category, name) {
        return this._getStore()[category][name];
    }
}

module.exports = Memory;