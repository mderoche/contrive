const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const getObjectPath = require('lodash/get');
const Memory = require('./Memory');
const TimesStep = require('./steps/TimesStep');
const MergeTransformStep = require('./steps/MergeTransformStep');
const MapTransformStep = require('./steps/MapTransformStep');
const DynamicValue = require('./DynamicValue');
const util = require('./util');

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

    _getCompressedObjects() {
        return (this._getObjects().length === 1) ? this._getObjects()[0] : this._getObjects();
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

    _processAsyncQueue(queue, fn) {
        return queue.reduce((p, step) => {
            return p.then(() => fn(step));
        }, Promise.resolve());
    }

    _resolveDynamics(object) {
        let dynamics = util.objectPaths(object)
            .filter(path => getObjectPath(object, path) instanceof DynamicValue)
            .map(path => getObjectPath(object, path))
            .map(dynamicValue => dynamicValue._invoke());

        return Promise.all(dynamics);
    };

    _resolveDynamicsArray(objects) {
        return Promise.all(
            objects.map(object => this._resolveDynamics(object))
        );
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
        if (!this._getQueue().length) {
            return this._getCompressedObjects();
        }

        if (this._isAsync()) {
            /*return this._processAsyncQueue(this._getQueue(), step => {
                return step._invoke(this._getObjects());
            })
            .then(() => {
                this._getObjects().forEach(object => this._resolveDynamics(object));
            })
            .then(() => this._getCompressedObjects());*/
        } else {
            let prs = this._getQueue()
                .map(step => {
                    return step._invoke(this._getObjects());
                });

            console.log(prs);
            return Promise.all(prs);
        }
 
   }
}

module.exports = Pipeline;