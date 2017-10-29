const cloneDeep = require('lodash/cloneDeep');
const Step = require('./Step');

class TimesStep extends Step {
    _invoke(things, opts = {}) {
        let peek = things[things.length - 1];
        let n = this.options.n;

        let transformed = things.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );

        if (opts.async) {
            return Promise.resolve(transformed);
        }

        return transformed;
    }
}

module.exports = TimesStep;