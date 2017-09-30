const expect = require('chai').expect;
const contrive = require('../src');

describe('object memory', () => {
    it('can remember an object', () => {
        contrive.rememberObject('test', { a: 1 });
        expect(contrive.vault.objects.test).to.deep.equal({ a: 1 });
    });

    it('can forget an object', () => {
        contrive.rememberObject('test', { a: 1 });
        contrive.forgetObject('test');
        expect(contrive.vault.objects.test).to.equal(undefined);
    });
});