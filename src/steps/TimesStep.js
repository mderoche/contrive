const cloneDeep = require('lodash/cloneDeep');
const Step = require('./Step');

class TimesStep extends Step {
    exec(objects) {
        let peek = objects[objects.length - 1];
        let n = this._getOptions().n;

        return objects.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );
    }
}

module.exports = TimesStep;