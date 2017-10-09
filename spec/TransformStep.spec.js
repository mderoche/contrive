const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const TransformStep = require('../src/steps/TransformStep');

describe('TransformStep', () => {
    describe('merges', () => {
        it('merges without conflicts', () => {
            let step = new TransformStep({
                transform: { b: 2 },
                args: undefined
            });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 1, b: 2 }]);
        });

        it('merges with conflicts', () => {
            let step = new TransformStep({
                transform: { a: 2 },
                args: undefined
            });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });
    });

    describe('functions', () => {
        it('transforms with a simple function', () => {
            let step = new TransformStep({
                transform: data => {
                    data.a = 2;
                    return data;
                },
                args: undefined
            });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });

        it('transforms with args', () => {
            let step = new TransformStep({
                transform: (data, args) => {
                    data.a = args.someArg;
                    return data;
                },
                args: { someArg: 1 }
            });
            let transformed = step.exec([{ a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 2 }]);
        });

        it('transforms with the object index', () => {
            let step = new TransformStep({
                transform: (data, args) => {
                    data.a = args.i;
                    return data;
                },
                args: undefined
            });
            let transformed = step.exec([{ a: 1 }, { a: 1 }, { a: 1 }]);
            expect(transformed).to.deep.equal([{ a: 0 }, { a: 1 }, { a: 2 }]);
        });
    });
});