const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TimesStep = require('../src/steps/TimesStep');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('TimesStep', () => {
    it('does nothing if times = 1', () => {
        let step = new TimesStep({
            n: 1
        });
        let transformed = step._invoke([{ a: 1 }]);
        expect(transformed).to.deep.equal([{ a: 1 }]);
    });

    it('clones if times > 1', () => {
        let step = new TimesStep({
            n: 2
        });
        let transformed = step._invoke([{ a: 1 }]);
        expect(transformed).to.deep.equal([{ a: 1 }, { a: 1 }]);
    });

    it('returns a promise if in async mode', () => {
        let step = new TimesStep({
            n: 1
        });
        let pr = step._invoke([{ a: 1 }], { async: true });
        return pr.should.eventually.deep.equal([{ a: 1 }]);
    })
});