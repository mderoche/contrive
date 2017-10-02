const expect = require('chai').expect;
const Memory = require('../src/Memory');

describe('Memory', () => {
    let m;
    before(() => {
        m = new Memory();
    });

    it('can remember an object', () => {
        m.remember('object', 'test', { a: 1 });
        expect(m.memory.object.test).to.deep.equal({ a: 1 });
    });

    it('can forget an object', () => {
        m.remember('object', 'test', { a: 1 });
        m.forget('object', 'test');
        expect(m.memory.object.test).to.equal(undefined);
    });

    it('can forget about everything', () => {
        m.remember('object', 'test', { a: 1 });
        m.amnesia();
        expect(m.memory).to.deep.equal({});
    });

    it('can reminisce about something remembered', () => {
        m.remember('object', 'test', { a: 1 });
        let obj = m.reminisce('object', 'test');
        expect(obj).to.deep.equal({ a: 1 });
    });
});