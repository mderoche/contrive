const Pipeline = require('./Pipeline');
const Memory = require('./Memory');

// create a new memory store to keep track of
// remembered objects and transforms
const memory = new Memory();


/**
 * Creates a new pipeline with a starting object
 * @param {Object} object - object to start the pipeline with
 * @returns {Pipeline} pipeline
 */
const createPipeline = object => {
    let pipe = new Pipeline({
        memoryStore: memory
    });
    
    pipe._inject(object);
    return pipe;
};


/**
 * Stores something for later use
 * @param {string} type - type of thing to store (`object`, or `transform`)
 * @param {string} name - name of the thing to store
 * @param {Object/Function} thing - item to store
 * @return {contrive} the contrive global for chaining
 */
const store = (type, name, thing) => {
    memory.set(type, name, thing);
    return this;
};

module.exports = {
    Pipeline: Pipeline,

    memory: memory,

    a: createPipeline,
    an: createPipeline,
    object: (name, object) => store('object', name, object),
    transform: (name, transform) => store('transform', name, transform)
};