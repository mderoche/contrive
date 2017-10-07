const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const TransformStep = require('../src/steps/TransformStep');

describe('TransformStep', () => {
    describe('merges', () => {
        it('merges without conflicts', () => {
            let step = new TransformStep({ b: 2 });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 1, b: 2 }]);
        });

        it('merges with conflicts', () => {
            let step = new TransformStep({ a: 2 });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });
    });

    describe('functions', () => {
        it('transforms with a simple function', () => {
            let step = new TransformStep(data => {
                data.a = 2;
                return data;
            });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });

        it('transforms with args', () => {
            let step = new TransformStep((data, args) => {
                data.a = args.someArg;
                return data;
            }, { someArg: 5 });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });

        it('transforms with the object index', () => {
            let step = new TransformStep((data, args) => {
                data.a = args.i;
                return data;
            });
            let transformed = step.exec([{ a: 1 }, { a: 1 }, { a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 0 }, { a: 1 }, { a: 2 }]);
        });
    });
});