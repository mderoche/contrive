const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Memory = require('./Memory');

class Pipeline {
    constructor () {
        this._objects = [];
        this._queue = [];
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

    _getQueue() {
        return this._queue;
    }

    _enqueue(object) {
        this._queue.push(object);
        return this;
    }

    _resolve(type, thing) {
        if (typeof thing === 'string') {
            let remembered = this._getMemory().get(type, thing);
            if (remembered) {
                return remembered;
            }
        }
        return thing;
    }
}

module.exports = Pipeline;