const cloneDeep = require('lodash/cloneDeep');
const Step = require('./Step');

class TransformStep extends Step {
    exec(objects) {
        let transform = this._getOptions().transform;
        let args = this._getOptions().args;

        let invoke = (typeof transform === 'object') ? mergeTransform : functionTransform;

        objects = objects.map((object, i) => {
            object = 
        });

        if (typeof transform === 'object') {
            return mergeTransform(transform);
        } else {
            return functionTransform(transform, args)
        }
    }

    mergeTransform(pipeline, transform) {

    }

    functionTransform(pipeline, transform, args) {
        let clonedArgs = cloneDeep(args);
        clonedArgs.i = index;
    }
}

module.exports = TransformStep;