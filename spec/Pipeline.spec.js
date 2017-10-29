const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const TimesStep = require('../src/steps/TimesStep');
const MapTransformStep = require('../src/steps/MapTransformStep');
const MergeTransformStep = require('../src/steps/MergeTransformStep');

describe('Pipeline', () => {
    let pipe;
    beforeEach(() => {
        pipe = new Pipeline();
    });

    describe('object management', () => {
        it('can get/set things', () => {
            pipe.things = 'test';
            expect(pipe.things).to.equal('test');
        });

        it('can inject a thing', () => {
            let go = pipe._inject('test');
            expect(go).to.deep.equal(pipe);
            expect(pipe.things).to.deep.equal(['test']);
        });
    });

    describe('queue management', () => {
        it('starts with an empty queue', () => {
            expect(pipe.queue).to.deep.equal([]);
        });

        it('can get/set the queue', () => {
            pipe.queue = 'test';
            expect(pipe.queue).to.equal('test');
        });

        it('can enqueue', () => {
            let go = pipe._enqueue({ step: 1 });
            expect(go).to.deep.equal(pipe);
            expect(pipe.queue.length).to.equal(1);
            expect(pipe.queue.pop()).to.deep.equal({ step: 1 });
        });
    });
    
    describe('eventually', () => {
        it('can get/set async', () => {
            pipe.async = 'test';
            expect(pipe.async).to.equal('test');
        });

        it('starts as sync', () => {
            expect(pipe.async).to.equal(false);
        });

        it('can become async', () => {
            pipe.eventually();
            expect(pipe.async).to.equal(true);
        });

        it('chains', () => {
            expect(pipe.eventually()).to.deep.equal(pipe);
        });
    });

    describe('times', () => {
        it('chains', () => {
            expect(pipe.times(1)).to.deep.equal(pipe);
        });

        it('adds a `times` step to the queue', () => {
            pipe.times(1);
            let step = pipe.queue[0];
            expect(step).instanceOf(TimesStep);
            expect(step.options).to.deep.equal({ n: 1 });
        });
    });

    describe('with', () => {
        it('chains', () => {
            expect(pipe.with({})).to.deep.equal(pipe);
        });

        it('enqueues a merge transform', () => {
            pipe.with({ a: 1 });
            let step = pipe.queue[0];
            expect(step).instanceOf(MergeTransformStep);
            expect(step.options).to.deep.equal({
                mergeWith: { a: 1 }
            });
        });

        it('enqueues a map transform', () => {
            pipe.with(() => 1);
            let step = pipe.queue[0];
            expect(step).instanceOf(MapTransformStep);
            expect(step.options.fn()).to.equal(1);
        });
    });

    describe('compression', () => {
        it('does not compress if > 1', () => {
            let c = pipe._compressValueOf([ 1, 2 ]);
            expect(c).to.deep.equal([ 1, 2 ]);
        });

        it('compresses if = 1', () => {
            let c = pipe._compressValueOf([ 1 ]);
            expect(c).to.deep.equal(1);
        });
    });
});