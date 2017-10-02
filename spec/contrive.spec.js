const assert = require('chai').assert;
const expect = require('chai').expect;
const contrive = require('../src');

describe('contriving', () => {
    it('creates a contrived pipeline', () => {
        ['a', 'an'].forEach(alias => {
            let c = contrive[alias]({});
            expect(c).to.be.an.instanceOf(contrive.ContrivedPipeline);
        });
    });

    describe('memory', () => {
        it('can remember an object', () => {
            contrive.object('test', { a: 1 });
            expect(contrive.a('test').valueOf()).to.deep.equal({ a: 1 });
        });
    
        it('can remember a transform', () => {
            contrive.transform('add-b', { b: 2 });
            let c = contrive.a({ a: 1 }).with('add-b').valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });
    });
});