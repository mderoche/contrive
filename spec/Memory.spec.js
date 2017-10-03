const expect = require('chai').expect;
const Memory = require('../src/Memory');

describe('Memory', () => {
    let m;
    before(() => {
        m = new Memory();
    });

    it('can remember an object', () => {
        m.set('object', 'test', { a: 1 });
        expect(m.store.object.test).to.deep.equal({ a: 1 });
    });

    it('can forget an object', () => {
        m.set('object', 'test', { a: 1 });
        m.remove('object', 'test');
        expect(m.store.object.test).to.equal(undefined);
    });

    it('can forget about everything', () => {
        m.set('object', 'test', { a: 1 });
        m.amnesia();
        expect(m.store).to.deep.equal({});
    });

    it('can reminisce about something remembered', () => {
        m.set('object', 'test', { a: 1 });
        let obj = m.get('object', 'test');
        expect(obj).to.deep.equal({ a: 1 });
    });
});