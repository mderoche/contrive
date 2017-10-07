const expect = require('chai').expect;
const contrive = require('../src');

describe('contriving', () => {
    it('creates a contrived pipeline', () => {
        ['a', 'an'].forEach(alias => {
            let c = contrive[alias]({ a: 1 });
            expect(c).to.be.an.instanceOf(contrive.Pipeline);
            expect(c._objects[0]).to.deep.equal({ a: 1 });
        });
    });

    it('can remember an object', () => {
        contrive.object('test', { a: 1 });
        expect(contrive.memory.store.object.test).to.deep.equal({ a: 1 });
    });

    it('can remember a transform', () => {
        contrive.transform('test', { a: 1 });
        expect(contrive.memory.store.transform.test).to.deep.equal({ a: 1 });
    });

    it('can remember a dynamic value', () => {
        contrive.dynamicValue('test', 'testing');
        expect(contrive.memory.store.dynamicValue.test).to.equal('testing');
    });

    it('can recall a dynamic value', () => {
        contrive.dynamicValue('test', 'testing');
        let recall = contrive.dynamicValue('test');
        expect(recall).to.equal('testing');
    });
});