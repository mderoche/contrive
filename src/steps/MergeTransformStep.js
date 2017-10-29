const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MergeTransformStep extends Step {
    _invoke(things, opts = {}) {
        things = cloneDeep(things);

        let mergeWith = this.options.mergeWith;
        let transformed = things.map(thing => merge(thing, mergeWith));
        
        if (opts.async) {
            return Promise.resolve(transformed);
        }
        
        return transformed;
    }
}

module.exports = MergeTransformStep;