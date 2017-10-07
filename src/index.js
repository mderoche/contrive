const Pipeline = require('./Pipeline');
const Memory = require('./Memory');

const _memory = new Memory();

const _store = (type, name, thing) => {
    if (thing) {
        _memory.set(type, name, thing);
        return this;
    } else {
        return _memory.get(type, name);
    }
};

const _launch = object => {
    let pipe = new Pipeline();
    pipe._injectObject(object);
    pipe._setMemory(_memory);
    return pipe;
};

module.exports = {
    _memory: _memory,

    a: _launch,
    an: _launch,
    the: _launch,

    object: (name, object) => _store('object', name, object),
    transform: (name, transform) => _store('transform', name, transform),
    dynamicValue: (name, dynamicValue) => _store('dynamicValue', name, dynamicValue)
};