const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MergeTransformStep = require('../src/steps/MergeTransformStep');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('MergeTransformStep', () => {
    it('merges without conflicts', () => {
        let step = new MergeTransformStep({
            mergeWith: { b: 2 }
        });

        let pr = step._invoke([{ a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 1, b: 2 } ]);
    });

    it('merges with conflicts', () => {
        let step = new MergeTransformStep({
            mergeWith: { a: 2 }
        });
        let pr = step._invoke([{ a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 2 } ]);
    });
});
