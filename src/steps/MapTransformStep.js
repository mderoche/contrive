const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Step = require('./Step');

class MapTransformStep extends Step {
    _invoke(objects) {
        let fn = this._getOptions().fn;
        let args = this._getOptions().args || {};

        let prs = objects.map((object, i) => {
            let clonedArgs = cloneDeep(args);
            clonedArgs.i = i;

            let transform = fn(object, clonedArgs);

            if (transform instanceof Promise) {
                return transform;
            } else {
                return Promise.resolve(transform);
            }
        });

        return Promise.all(prs);
    }
}

module.exports = MapTransformStep;