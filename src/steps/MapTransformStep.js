const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MapTransformStep extends Step {
    _invoke(objects, opts = {}) {
        let fn = this._getOptions().fn;
        let args = this._getOptions().args || {};

        if (opts.async) {
            let prs = objects.map((object, i) => {
                let clonedArgs = cloneDeep(args);
                clonedArgs.i = i;

                let transform = fn(object, clonedArgs);

                return (transform instanceof Promise) ? transform : Promise.resolve(transform);
            });

            return Promise.all(prs);
        } else {
            let transformed = objects.map((object, i) => {
                let clonedArgs = cloneDeep(args);
                clonedArgs.i = i;
                return fn(object, clonedArgs);
            });
            return transformed;
        }
    }
}

module.exports = MapTransformStep;