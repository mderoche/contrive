const ContrivedSet = require('./ContrivedSet');
const Contrived = require('./Contrived');
const Memory = require('./Memory');

const resolveObject = data => {
    if (typeof data === 'string') {
        let remembered = memory.reminisce('object', data);
        if (remembered) {
            data = remembered;
        }
    }

    return new ContrivedSet(data);
}

const memory = new Memory();

module.exports = {
    ContrivedSet: ContrivedSet,
    Contrived: Contrived,

    a: resolveObject,
    an: resolveObject,

    object: (name, object) => {
        memory.remember('object', name, object)
        return this;
    },
    transform: (name, transform) => {
        memory.remember('transform', name, transform)
        return this;
    }
};