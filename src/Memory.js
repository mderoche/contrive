class Memory {
    constructor () {
        this.store = {};
    }

    set(category, name, object) {
        if (!this.store[category]) {
            this.store[category] = {};
        }
        this.store[category][name] = object;
    }

    remove(category, name) {
        delete this.store[category][name];
    }

    get(category, name) {
        return this.store[category][name];
    }

    amnesia() {
        this.store = {};
    }
}

module.exports = Memory;