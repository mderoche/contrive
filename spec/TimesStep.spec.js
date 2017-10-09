const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const TimesStep = require('../src/steps/TimesStep');

describe('TimesStep', () => {
    it('does nothing if times = 1', () => {
        let step = new TimesStep({
            n: 1
        });
        let transformed = step.exec([{ a: 1 }]);
        expect(transformed).to.deep.equal([{ a: 1 }]);
    })

    it('clones if times > 1', () => {
        let step = new TimesStep({
            n: 2
        });
        let transformed = step.exec([{ a: 1 }]);
        expect(transformed).to.deep.equal([{ a: 1 }, { a: 1 }]);
    });
});