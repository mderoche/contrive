const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MergeTransformStep extends Step {
    _invoke(objects) {
        let mergeWith = this._getOptions().mergeWith;
        objects = objects.map(object => merge(object, mergeWith));
        return Promise.resolve(objects);
    }
}

module.exports = MergeTransformStep;