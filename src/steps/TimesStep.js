const cloneDeep = require('lodash/cloneDeep');
const Step = require('./Step');

class TimesStep extends Step {
    _invoke(objects, opts = {}) {
        let peek = objects[objects.length - 1];
        let n = this._getOptions().n;

        let transformed = objects.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );

        if (opts.async) {
            return Promise.resolve(transformed);
        }

        return transformed;
    }
}

module.exports = TimesStep;