const cloneDeep = require('lodash/cloneDeep');
const Pipeline = require('./Pipeline');

const _launch = thing => {
    let pipe = new Pipeline();
    pipe._inject(
        cloneDeep(thing)
    );
    return pipe;
};

module.exports = {
    a: _launch,
    an: _launch,
    the: _launch
};