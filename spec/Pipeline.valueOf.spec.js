const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Pipeline = require('../src/Pipeline');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('valueOf', () => {
    let pipe;
    beforeEach(() => {
        pipe = new Pipeline();
    });

    describe('sync', () => {
        it('collapses a queue with one item', () => {
            pipe._inject({ a: 1 });
            let v = pipe.valueOf();
            expect(v).to.deep.equal({ a: 1 });
        });

        it('collapses a queue with multiple items', () => {
            pipe._inject({ a: 1 });
            pipe._inject({ a: 1 });
            let v = pipe.valueOf();
            expect(v).to.deep.equal([{ a: 1 }, { a: 1 }]);
        });

        it('applies a transform to one item', () => {
            pipe._inject({ a: 1 });
            let v = pipe.with({ a: 2 }).valueOf();
            expect(v).to.deep.equal({ a: 2 });
        });

        it('applies a transform to multiple items', () => {
            pipe._inject({ a: 1 });
            pipe._inject({ a: 1 });
            let v = pipe.with({ a: 2 }).valueOf();
            expect(v).to.deep.equal([{ a: 2 }, { a: 2 }]);
        });

        it('works with mutiple withs', () => {
            pipe._inject({ a: 1 });
            let v = pipe.with({ a: 2 }).with({ b: 2 }).valueOf();
            expect(v).to.deep.equal({ a: 2, b: 2 });
        }); 
    });

    describe('async', () => {
        it('collapses a queue with one item', () => {
            pipe._inject({ a: 1 });
            let v = pipe.eventually().valueOf();
            return v.should.eventually.deep.equal({ a: 1 });
        });

        it('collapses a queue with multiple items', () => {
            pipe._inject({ a: 1 });
            pipe._inject({ a: 1 });
            let v = pipe.eventually().valueOf();
            return v.should.eventually.deep.equal([{ a: 1 }, { a: 1 }]);
        });

        it('applies a transform to one item', () => {
            pipe._inject({ a: 1 });
            let v = pipe.eventually().with({ a: 2 }).valueOf();
            return v.should.eventually.deep.equal({ a: 2 });
        });

        it('applies a transform to multiple items', () => {
            pipe._inject({ a: 1 });
            pipe._inject({ a: 1 });
            let v = pipe.eventually().with({ a: 2 }).valueOf();
            return v.should.eventually.deep.equal([{ a: 2 }, { a: 2 }]);
        });

        it('works with mutiple withs', () => {
            pipe._inject({ a: 1 });
            let v = pipe.eventually().with({ a: 2 }).with({ b: 2 }).valueOf();
            v.should.eventually.deep.equal({ a: 2, b: 2 });
        }); 
    });
});