const expect = require('chai').expect;
const contrive = require('../src');

describe('transform memory', () => {
    it('can remember an transform', () => {
        contrive.rememberTransform('test', { a: 1 });
        expect(contrive.vault.transform.test).to.deep.equal({ a: 1 });
    });

    it('can forget an transform', () => {
        contrive.rememberTransform('test', { a: 1 });
        contrive.forgetTransform('test');
        expect(contrive.vault.objects.test).to.equal(undefined);
    });
});