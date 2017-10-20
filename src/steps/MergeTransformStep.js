const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MergeTransformStep extends Step {
    _invoke(objects, opts = {}) {
        let mergeWith = this._getOptions().mergeWith;
        let transformed = objects.map(object => merge(object, mergeWith));
        
        if (opts.async) {
            return Promise.resolve(transformed);
        }
        
        return transformed;
    }
}

module.exports = MergeTransformStep;