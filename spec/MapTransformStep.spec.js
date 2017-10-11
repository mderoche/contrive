const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MapTransformStep = require('../src/steps/MapTransformStep');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('MapTransformStep', () => {
    it('transforms with a simple map', () => {
        let step = new MapTransformStep({
            fn: data => {
                data.a = 2;
                return data;
            }
        });

        let pr = step._invoke([{ a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 2 } ]);
    });

    it('transforms with a map using args', () => {
        let step = new MapTransformStep({
            fn: (data, args) => {
                data.a = args.someArg;
                return data;
            },
            args: {
                someArg: 5
            }
        });

        let pr = step._invoke([{ a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 5 } ]);
    });

    it('transforms with a map using args index', () => {
        let step = new MapTransformStep({
            fn: (data, args) => {
                data.a = args.i;
                return data;
            }
        });

        let pr = step._invoke([{ a: 1 }, { a: 1 }, { a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 0 }, { a: 1 }, { a: 2 } ]);
    });

    it('transforms asynchronously', () => {
        let step = new MapTransformStep({
            fn: data => {
                return Promise.resolve({
                    a: data.a + 1
                });
            }
        });

        let pr = step._invoke([{ a: 1 }]);
        expect(pr).to.be.an.instanceOf(Promise);
        return pr.should.eventually.deep.equal([ { a: 2 } ]);
    });
});
