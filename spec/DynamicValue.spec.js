const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const DynamicValue = require('../src/DynamicValue');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('DynamicValue', () => {
    it('can set the fn', () => {
        let dv = new DynamicValue();
        dv._setFn('test');
        expect(dv._fn).to.equal('test');
    });

    it('can get the fn', () => {
        let dv = new DynamicValue();
        dv._setFn('test');
        let fn = dv._getFn();
        expect(fn).to.equal('test');
    });

    it('sets the fn via the contructor', () => {
        let dv = new DynamicValue('test');
        expect(dv._getFn()).to.equal('test');
    });

    it('executing the fn resolves with a promise', () => {
        let dv = new DynamicValue(() => 'test');
        let pr = dv.exec();
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.be.equal('test');
    });
});