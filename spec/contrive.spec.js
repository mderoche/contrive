const assert = require('chai').assert;
const expect = require('chai').expect;
const contrive = require('../src');

describe('contriving', () => {
    it('has both fetch functions', () => {
        expect(contrive.a).to.be.a.instanceOf(Function);
        expect(contrive.an).to.be.a.instanceOf(Function);
    });

    it('creates a contrived set', () => {
        ['a', 'an'].forEach(alias => {
            let c = contrive.a({});
            assert.isArray(c.contrived);
            assert.instanceOf(c, contrive.ContrivedSet)
            assert.instanceOf(c.contrived[0], contrive.Contrived);
        });
    });
});