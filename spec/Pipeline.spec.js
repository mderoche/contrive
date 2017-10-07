const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const TimesStep = require('../src/steps/TimesStep');
const TransformStep = require('../src/steps/TransformStep');

describe('Pipeline', () => {
    let pipe;
    before(() => {
        pipe = new Pipeline();
    });

    describe('memory management', () => {
        it('can get the memory store', () => {
            pipe._memory = 'test';
            expect(pipe._getMemory()).to.equal('test');
        });
    
        it('can set the memory store', () => {
            let go = pipe._setMemory('test');
            expect(go).to.deep.equal(pipe);
            expect(pipe._getMemory()).to.equal('test');
        });
    });

    describe('object management', () => {
        it('can get the objects in the pipeline', () => {
            pipe._objects = 'test';
            expect(pipe._getObjects()).to.equal('test');
        });

        it('can add an object to the pipeline', () => {
            let go = pipe._injectObject({ a: 1 });
            expect(go).to.deep.equal(pipe);
            expect(pipe._getObjects()).to.equal([{ a: 1 }]);
        });
    });

    describe('object/transform resolving', () => {
        it('can resolve an object name -> object' , () => {
            pipe._getMemory().set('object', 'test', { a: 1 });
            let test = pipe._resolve('object', 'test');
            expect(test).to.deep.equal({ a: 1 });
        });

        it('can resolve an object to itself' , () => {
            let test = pipe._resolve('object', { a: 1 });
            expect(test).to.deep.equal({ a: 1 });
        });

        it('can resolve a transform name -> transform', () => {
            pipe._getMemory().set('transform', 'test', { a: 1 });
            let test = pipe._resolve('transform', 'test');
            expect(test).to.deep.equal({ a: 1 });
        });

        it('can resolve an transform to itself' , () => {
            let test = pipe._resolve('transform', { a: 1 });
            expect(test).to.deep.equal({ a: 1 });
        });
    });

    describe('queue management', () => {
        it('starts with an empty queue', () => {
            expect(pipe._queue).to.deep.equal([]);
        });

        it('can get the queue', () => {
            pipe._queue = 'test';
            expect(pipe._getQueue()).to.equal('test');
        });

        it('can add to the queue', () => {
            let go = pipe._enqueue({ step: 1 });
            expet(go).to.deep.equal(pipe);
            expect(pipe._getQueue().pop()).to.deep.equal({ step: 1 });
        });
    });
    
    describe('async', () => {
        it('starts as sync', () => {
            expect(pipe._async).to.equal(false);
        });

        it('can become async', () => {
            pipe.eventually();
            expect(pipe._async).to.equal(true);
        });

        it('chains as async', () => {
            expect(pipe.eventually()).to.deep.equal(pipe);
        });
    });

    describe('times', () => {
        it('chains', () => {
            expect(pipe.times(1)).to.deep.equal(pipe);
        });

        it('adds a `times` step to the queue', () => {
            pipe.times(1);
            let step = pipe._q[0];
            expect(step).to.be.an.instanceOf(TimesStep);
            expect(step._type).to.equal('times');
        });
    });

    describe('with', () => {
        it('chains', () => {
            expect(pipe.with({})).to.deep.equal(pipe);
        });

        it('adds a `transform` step to the queue', () => {
            pipe.with({});
            let step = pipe._q[0];
            expect(step).to.be.an.instanceOf(TransformStep);
        });
    });

    describe('valueOf', () => {
        it('returns the original value if there are no steps', () => {
            pipe._injectObject({ a: 1 });
            expect(pipe.valueOf()).to.deep.equal({ a: 1 });
        });

        it('returns as an array if there are multiple objects', () => {
            pipe._injectObject({ a: 1 }).times(2);
            expect(pipe.valueOf()).to.deep.equal([{ a: 1 }, { a: 1 }]);
        });

        it('applies transforms as it collapses, to one object', () => {
            pipe._injectObject({ a: 1 })
                .with({ b: 2 })
                .valueOf();

            expect(pipe.valueOf()).to.deep.equal({ a: 1, b: 2 });
        });

        it('applies transforms as it collapses, to multiple object', () => {
            pipe._injectObject({ a: 1 })
                .times(2)
                .with({ b: 2 })
                .valueOf();

            expect(pipe.valueOf()).to.deep.equal([{ a: 1, b: 2 }, { a: 1, b: 2 }]);
        });

        it('applies multiple transforms as it collapses, to multiple object', () => {
            pipe._injectObject({ a: 1 })
                .times(2)
                .with({ b: 2 })
                .with((data, args) => {
                    data.index = args.i
                })
                .valueOf();

            expect(pipe.valueOf())
                .to.deep.equal([
                    { a: 1, b: 2, index: 0 },
                    { a: 1, b: 2, index: 1 }
                ]);
        });

        it('returns a promise if async', () => {
            let pr = pipe._injectObject({ a: 1 })
                .eventually()
                .valueOf();

            expect(pr).to.be.an.instanceOf(Promise);
        });

        it('resolves with the collapsed result if async', () => {
            let pr = pipe._injectObject({ a: 1 })
                .eventually()
                .times(2)
                .with({ b: 2 })
                .valueOf();

            return pr.should.eventually.deep.equal([
                { a: 1, b: 2 },
                { a: 1, b: 2 }
            ]);
        });
    });
});