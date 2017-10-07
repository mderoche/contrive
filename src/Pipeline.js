const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Memory = require('./Memory');

class Pipeline {
    constructor () {
        this._objects = [];
        this._memory = new Memory();
    }

    _getObjects() {
        return this._objects;
    }

    _injectObject(object) {
        this._objects.push(object);
        return this;
    }

    _getMemory() {
        return this._memory;
    }

    _setMemory(memory) {
        this._memory = memory;
        return this;
    }
}

module.exports = Pipeline;