const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');

describe('Pipeline', () => {
    let pipe;
    before(() => {
        pipe = new Pipeline();
    });

    it('can add an object to the pipline', () => {
        pipe._injectObject({ a: 1 });
        expect(pipe._objects).to.deep.equal([{ a: 1 }]);
    });

    it('has pipeline functions', () => {
        ['times', 'with', 'valueOf'].forEach(fn => {
            expect(pipe[fn]).to.be.an.instanceOf(Function);
        });
    })
});