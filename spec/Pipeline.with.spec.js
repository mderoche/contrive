const assert = require('chai').assert;
const expect = require('chai').expect;
const contrive = require('../src');

describe('with', () => {
    it('returns the pipeline for chaining', () => {
        expect(contrive.a({ a: 1 }).with())
            .to.be.an.instanceof(contrive.Pipeline);
    });

    it('does nothing if provided nothing', () => {
        let raw = { a: 1 };
        let c = contrive.a(raw).with();

        expect(c._objects[0])
            .to.deep.equal(raw);
    });

    describe('object transforms', () => {
        it('merges in an object without colliding keys', () => {
            let c = contrive.a({ a: 1 }).with({ b: 2 });

            expect(c._objects[0])
                .to.deep.equal({ a: 1, b: 2 });
        });

        it('merges in an object with colliding keys', () => {
            let c = contrive.a({ a: 1 }).with({ a: 2 });

            expect(c._objects[0])
                .to.deep.equal({ a: 2 });
        });
    });

    describe('function transforms', () => {
        it('transforms with a function', () => {
            let c = contrive.a({ a: 1 }).with(payload => {
                payload.a = 2;
                return payload;
            });

            expect(c._objects[0])
                .to.deep.equal({ a: 2 });
        });

        it('transforms with a function that uses the index', () => {
            let c = contrive.a({ a: 1 }).times(2).with((payload, args) => {
                payload.a = args.i;
                return payload;
            });

            expect(c._objects)
                .to.deep.equal([ { a: 0 }, { a: 1 } ]);
        });

        it('transforms the payload with a function with arguments', () => {
            let c = contrive.a({ a: 1 }).with((payload, args) => {
                payload.a = args.someArg;
                return payload;
            }, {
                someArg: 'test'
            });

            expect(c._objects[0])
                .to.deep.equal({ a: 'test' });
        });
    });

    describe('remembering transforms', () => {
        it('can reminisce on a remembered transform', () => {
            contrive.transform('b', { b: 2 });
            let transformed = contrive.a({ a: 1 }).with('b').valueOf();
            expect(transformed).to.deep.equal({ a: 1, b: 2 });
        });
    })
});