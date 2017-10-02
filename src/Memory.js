class Memory {
    constructor () {
        this.memory = {};
    }

    remember(category, name, object) {
        if (!this.memory[category]) {
            this.memory[category] = {};
        }
        this.memory[category][name] = object;
    }

    forget(category, name) {
        delete this.memory[category][name];
    }

    reminisce(category, name) {
        return this.memory[category][name];
    }

    amnesia() {
        this.memory = {};
    }
}

module.exports = Memory;