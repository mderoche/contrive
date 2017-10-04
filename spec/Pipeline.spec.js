const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');

describe('Pipeline', () => {
    let pipe;
    before(() => {
        pipe = new Pipeline();
    });

    it('can add an object to the pipline', () => {
        pipe._inject({ a: 1 });
        expect(pipe._objects).to.deep.equal([{ a: 1 }]);
    });

    it('can set the memory store', () => {
        let oldStore = pipe._memory;
        pipe._memoryStore('test');
        let newStore = pipe._memory;
        expect(newStore).to.equal('test');
    });
});