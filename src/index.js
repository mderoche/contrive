const ContrivedSet = require('./ContrivedSet');
const Contrived = require('./Contrived');

const get = data => new ContrivedSet(data);

module.exports = {
    ContrivedSet: ContrivedSet,
    Contrived: Contrived,

    a: get,
    an: get
};