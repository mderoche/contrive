const expect = require('chai').expect;
const Memory = require('../src/Memory');

describe('Memory', () => {
    let m;
    before(() => {
        m = new Memory();
    });

    it('starts with an empty store', () => {
        expect(m._store).to.deep.equal({});
    });

    it('can get the store', () => {
        let s = m._getStore();
        expect(s).to.deep.equal({});
    });

    it('can remember an object', () => {
        m.set('object', 'test', { a: 1 });
        expect(m._getStore().object.test).to.deep.equal({ a: 1 });
    });

    it('can reminisce about something remembered', () => {
        m.set('object', 'test', { a: 1 });
        let obj = m.get('object', 'test');
        expect(obj).to.deep.equal({ a: 1 });
    });
});