const expect = require('chai').expect;
const DynamicValue = require('../src/DynamicValue');

describe('DynamicValue', () => {
    it('can execute the fn to get the value', () => {
        let dv = new DynamicValue(() => 'test');
        expect(dv.valueOf()).to.equal('test');
    });
});

contrive.dynamic('test', () => {});


{
    a: contrive.dynamic('test')
}