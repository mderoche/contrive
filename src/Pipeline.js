const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const getObjectPath = require('lodash/get');
const Memory = require('./Memory');
const TimesStep = require('./steps/TimesStep');
const MergeTransformStep = require('./steps/MergeTransformStep');
const MapTransformStep = require('./steps/MapTransformStep');
const DynamicValue = require('./DynamicValue');
const util = require('./util');

async function invokeAsyncSteps(objs, steps) {
    for (const step of steps) {
        objs = await step._invoke(objs)
    }
    return objs;
}

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

    _compress(objects) {
        return (objects.length === 1) ? objects[0] : objects;
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

    valueOf() {
        let objects = this._getObjects();

        if (!this._isAsync()) {
            if (!this._getQueue().length) {
                return this._compress(this._getObjects());
            }

            this._getQueue().forEach(step => {
                objects = step._invoke(objects);
            });

            return this._compress(objects);
        } else {
            if (!this._getQueue().length) {
                return Promise.resolve(this._compress(this._getObjects()));
            }
            
            return invokeAsyncSteps(objects, this._getQueue())
                .then(o => this._compress(o));
        }
   }
}

module.exports = Pipeline;