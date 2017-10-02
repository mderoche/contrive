const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');

class Pipeline {
    constructor () {
        this._objects = [];
    };

    _injectObject(object) {
        this._objects.push(object);
    };

    times(n) {
        if (typeof n !== 'number') {
            throw new Error('ContrivedSet.times requires an integer');
        }

        let peek = this._objects[this._objects.length - 1];

        this._objects = this._objects.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );

        return this;
    };

    with(transform, args = {}) {
        this._objects = this._objects.map((c, i) => {
            let clonedArgs = cloneDeep(args);
            clonedArgs.i = i;

            if (typeof transform === 'function') {
                c = transform(c, clonedArgs);
            } else {
                c = merge(c, transform);
            }

            return c;
        });

        return this;
    };

    valueOf() {
        return this._objects.length > 1 ?
            this._objects : this._objects[0];
    };
}

module.exports = Pipeline;