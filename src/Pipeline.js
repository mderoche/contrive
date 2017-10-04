const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Memory = require('./Memory');

class Pipeline {
    constructor (def = {}) {
        this._objects = [];
        this._memory = def.memoryStore || new Memory();
    }

    _resolve(type, thing) {
        if (typeof thing === 'string') {
            let remembered = this._memory.get(type, thing);
            return remembered;
        }
        return thing;
    }

    _inject(object) {
        this._objects.push(
            this._resolve('object', object)
        );
    }

    _memoryStore(memory) {
        this._memory = memory;
    }

    _invokeTransform(object, transform, args = {}, index = 0) {
        object = cloneDeep(object);
        
        let clonedArgs = cloneDeep(args);
        clonedArgs.i = index;

        if (typeof transform === 'function') {
            object = transform(object, clonedArgs);
        } else {
            object = merge(object, transform);
        }

        return object;
    }

    times(n) {
        if (typeof n !== 'number') {
            throw new Error('ContrivedSet.times requires an integer');
        }

        let peek = this._objects[this._objects.length - 1];

        this._objects = this._objects.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );

        return this;
    }

    with(transform, args = {}) {
        transform = this._resolve('transform', transform);

        this._objects = this._objects.map((object, i) => {
            object = this._invokeTransform(object, transform, args, i);
            return object;
        });

        return this;
    }

    valueOf() {
        return this._objects.length > 1 ?
            this._objects : this._objects[0];
    }
}

module.exports = Pipeline;