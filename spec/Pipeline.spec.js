const expect = require('chai').expect;
const Pipeline = require('../src/Pipeline');
const Step = require('../src/Step');

describe('Pipeline', () => {
    let pipe;
    before(() => {
        pipe = new Pipeline();
    });

    describe('memory management', () => {
        it('can set the memory store', () => {
            pipe._setMemory('test');
            let memory = pipe._memory;
            expect(memory).to.equal('test');
        });
    });

    describe('object/transform resolving', () => {
        it('can resolve an object name -> object' , () => {
            pipe._memory.set('object', 'test', { a: 1 });
            let test = pipe._resolve('object', 'test');
            expect(test).to.deep.equal({ a: 1 });
        });

        it('can resolve an object to itself' , () => {
            let test = pipe._resolve('object', { a: 1 });
            expect(test).to.deep.equal({ a: 1 });
        });

        it('can resolve a transform name -> transform', () => {
            pipe._memory.set('transform', 'test', { a: 1 });
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
            expect(pipe._q).to.deep.equal([]);
        });

        it('can add a step to the queue', () => {
            pipe._queue({ step: 1 });
            expect(pipe._q[0]).to.deep.equal({ step: 1 });
        });
    });
    
    describe('eventually', () => {
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
            expect(step).to.be.an.instanceOf(Step);
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
            expect(step).to.be.an.instanceOf(Step);
            expect(step._type).to.equal('transform');
        });
    });
});