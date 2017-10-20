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

        let t = step._invoke([{ a: 1 }]);
        expect(t).to.deep.equal([ { a: 2 } ]);
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

        let t = step._invoke([{ a: 1 }]);
        expect(t).to.deep.equal([ { a: 5 } ]);
    });

    it('transforms with a map using args index', () => {
        let step = new MapTransformStep({
            fn: (data, args) => {
                data.a = args.i;
                return data;
            }
        });

        let t = step._invoke([{ a: 1 }, { a: 1 }, { a: 1 }]);
        expect(t).to.deep.equal([ { a: 0 }, { a: 1 }, { a: 2 } ]);
    });

    it('transforms with a simple map', () => {
        let step = new MapTransformStep({
            fn: data => {
                return Promise.resolve({ a: 2 });
            }
        });

        let pr = step._invoke([{ a: 1 }], { async: true });
        return pr.should.eventually.deep.equal([{ a: 2 }]);
    });
});
