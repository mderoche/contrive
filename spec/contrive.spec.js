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

    describe('memory', () => {
        it('can remember an object', () => {
            contrive.object('test', { a: 1 });
            expect(contrive.a('test')._objects[0]).to.deep.equal({ a: 1 });
        });
    });
});