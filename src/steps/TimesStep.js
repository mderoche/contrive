const cloneDeep = require('lodash/cloneDeep');
const Step = require('./Step');

class TimesStep extends Step {
    exec(pipeline) {
        let peek = pipeline[pipeline.length - 1];

        return this.pipeline.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );
    }
}