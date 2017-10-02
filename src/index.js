const Pipeline = require('./Pipeline');
const Memory = require('./Memory');

const createPipeline = object => {

    // if it's a string, see if it's been remembered
    if (typeof object === 'string') {
        let remembered = memory.reminisce('object', object);
        if (remembered) {
            object = remembered;
        }
    }

    let pipe = new Pipeline();
    pipe._injectObject(object);

    return pipe;
};

const memory = new Memory();

module.exports = {
    Pipeline: Pipeline,

    a: createPipeline,
    an: createPipeline,

    object: (name, object) => {
        memory.remember('object', name, object)
        return this;
    },
    transform: (name, transform) => {
        memory.remember('transform', name, transform)
        return this;
    }
};