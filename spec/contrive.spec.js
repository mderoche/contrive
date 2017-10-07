const expect = require('chai').expect;
const contrive = require('../src');
const Pipeline = require('../src/Pipeline');

describe('contriving', () => {
    it('creates a contrived pipeline', () => {
        ['a', 'an', 'the'].forEach(alias => {
            let c = contrive[alias]({ a: 1 });
            expect(c).to.be.an.instanceOf(Pipeline);
            expect(c._objects[0]).to.deep.equal({ a: 1 });
        });
    });

    it('can recall an object', () => {
        contrive.object('test', 'testing');
        let o = contrive.object('test');
        expect(o).to.equal('testing');
    });

    it('can recall a transform', () => {
        contrive.transform('test', 'testing');
        let o = contrive.object('test');
        expect(o).to.equal('testing');
    });

    it('can recall a dynamic value', () => {
        contrive.dynamicValue('test', 'testing');
        let recall = contrive.dynamicValue('test');
        expect(recall).to.equal('testing');
    });
});