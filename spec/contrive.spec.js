const expect = require('chai').expect;
const contrive = require('../src');
const Pipeline = require('../src/Pipeline');

describe('contriving', () => {
    it('creates a contrived pipeline', () => {
        ['a', 'an', 'the'].forEach(alias => {
            let c = contrive[alias]({ a: 1 });
            expect(c).instanceOf(Pipeline);
        });
    });
});