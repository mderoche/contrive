const expect = require('chai').expect;
const contrive = require('../src');

describe('valueOf', () => {
    it('returns a single object if there is only 1 contrived object', () => {
        let c = contrive.a({ a: 1 }).valueOf();
        expect(c).to.deep.equal({ a: 1 });
    });

    it('returns an array if there are >1 contrived objects', () => {
        let c = contrive.a({ a: 1 }).times(2).valueOf();
        expect(c).to.deep.equal([{ a: 1 }, { a: 1 }]);
    });
});