const expect = require('chai').expect;
const ContrivedPipeline = require('../src/ContrivedPipeline');

describe('ContrivedPipeline', () => {
    let pipe;
    before(() => {
        pipe = new ContrivedPipeline();
    });

    it('can add an object to the pipline', () => {
        pipe._object({ a: 1 });
        expect(pipe._objects).to.equal([{ a: 1 }]);
    });

    it('has pipeline functions', () => {
        ['times', 'with', 'valueOf'].forEach(fn => {
            expect(pipe[fn]).to.be.an.instanceOf(Function);
        });
    })
});