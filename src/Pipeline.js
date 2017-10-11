const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Memory = require('./Memory');
const TimesStep = require('./steps/TimesStep');
const MergeTransformStep = require('./steps/MergeTransformStep');
const MapTransformStep = require('./steps/MapTransformStep');

class Pipeline {
    constructor () {
        this._objects = [];
        this._queue = [];
        this._memory = new Memory();
        this._async = false;

        this._stepsLibrary = {
            object: MergeTransformStep,
            function: MapTransformStep
        };
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

    _enqueue(step) {
        this._queue.push(step);
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

    _isAsync() {
        return this._async;
    }

    eventually() {
        this._async = true;
        return this;
    }

    times(n) {
        let step = new TimesStep({
            n: n
        });
        this._enqueue(step);
        return this;
    }

    with(transform, args) {
        transform = this._resolve('transform', transform);

        if (typeof transform === 'object') {
            this._enqueue(
                new MergeTransformStep({
                    mergeWith: transform
                })
            );
        }

        if (typeof transform === 'function') {
            this._enqueue(
                new MapTransformStep({
                    fn: transform,
                    args: args
                })
            );
        }

        return this;
    }
}

module.exports = Pipeline;