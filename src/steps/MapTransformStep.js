const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MapTransformStep extends Step {
    _invoke(things, opts = {}) {
        let fn = this.options.fn;
        let args = this.options.args || {};
        let clonedArgs = cloneDeep(args);

        if (opts.async) {
            let prs = things.map((thing, i) => {
                clonedArgs.i = i;
                let transform = fn(thing, clonedArgs);
                return (transform instanceof Promise) ? transform : Promise.resolve(transform);
            });

            return Promise.all(prs);
        } else {
            let transformed = things.map((thing, i) => {
                let clonedArgs = cloneDeep(args);
                clonedArgs.i = i;
                return fn(cloneDeep(thing), clonedArgs);
            });
            return transformed;
        }
    }
}

module.exports = MapTransformStep;