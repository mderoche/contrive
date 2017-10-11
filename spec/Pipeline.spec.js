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
            let go = pipe._injectObject('test');
            expect(go).to.deep.equal(pipe);
            expect(pipe._getObjects()).to.deep.equal(['test']);
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

        it('can resolve a transform to itself' , () => {
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
            expect(go).to.deep.equal(pipe);
            expect(pipe._queue.pop()).to.deep.equal({ step: 1 });
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

        it('knows if it is async', () => {
            expect(pipe._isAsync()).to.equal(false);
            pipe.eventually();
            expect(pipe._isAsync()).to.equal(true);
        });
    });

    describe('times', () => {
        it('chains', () => {
            expect(pipe.times(1)).to.deep.equal(pipe);
        });

        it('adds a `times` step to the queue', () => {
            pipe.times(1);
            let step = pipe._getQueue()[0];
            expect(step).to.be.an.instanceOf(TimesStep);
            expect(step._getOptions()).to.deep.equal({ n: 1 });
        });
    });

    describe('with', () => {
        it('chains', () => {
            expect(pipe.with({})).to.deep.equal(pipe);
        });

        it('adds a merge transform step to the queue', () => {
            pipe.with({ a: 1 });
            let step = pipe._getQueue()[0];
            expect(step).to.be.an.instanceOf(MergeTransformStep);
            expect(step._getOptions()).to.deep.equal({
                mergeWith: { a: 1 }
            });
        });

        it('adds a map transform step to the queue', () => {
            pipe.with(() => 1);
            let step = pipe._getQueue()[0];
            expect(step).to.be.an.instanceOf(MapTransformStep);
            expect(step._getOptions().fn()).to.equal(1);
        });
    });
});