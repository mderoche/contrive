const expect = require('chai').expect;
const Step = require('../src/steps/Step');


describe('Step', () => {
    let step;
    beforeEach(() => {
        step = new Step({ a: 1});
    });

    it('can get/set options', () => {
        step.options = { a: 2 };
        expect(step.options).to.deep.equal({ a: 2 });
    });
    
    it('takes options on construction', () => {
        expect(step.options).to.deep.equal({ a: 1 });
    });

    it('throws an error on unimplemented invoke', () => {
        expect(() => step._invoke()).to.throw();
    });
});