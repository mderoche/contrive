const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Pipeline = require('../src/Pipeline');
const DynamicValue = require('../src/DynamicValue');

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
            pipe._injectObject({ a: 1 });
            let v = pipe.valueOf();
            expect(v).to.deep.equal({ a: 1 });
        });

        it('collapses a queue with multiple items', () => {
            pipe._injectObject({ a: 1 });
            pipe._injectObject({ a: 1 });
            let v = pipe.valueOf();
            expect(v).to.deep.equal([{ a: 1 }, { a: 1 }]);
        });

        it('applies a transform to one item', () => {
            pipe._injectObject({ a: 1 });
            let v = pipe.with({ a: 2 }).valueOf();
            expect(v).to.deep.equal({ a: 2 });
        });

        it('applies a transform to multiple items', () => {
            pipe._injectObject({ a: 1 });
            pipe._injectObject({ a: 1 });
            let v = pipe.with({ a: 2 }).valueOf();
            expect(v).to.deep.equal([{ a: 2 }, { a: 2 }]);
        });
    });

    describe('async', () => {
        it('collapses a queue with one item', () => {
            pipe._injectObject({ a: 1 });
            let v = pipe.eventually().valueOf();
            return v.should.eventually.deep.equal({ a: 1 });
        });

        it('collapses a queue with multiple items', () => {
            pipe._injectObject({ a: 1 });
            pipe._injectObject({ a: 1 });
            let v = pipe.eventually().valueOf();
            return v.should.eventually.deep.equal([{ a: 1 }, { a: 1 }]);
        });

        it('applies a transform to one item', () => {
            pipe._injectObject({ a: 1 });
            let v = pipe.eventually().with({ a: 2 }).valueOf();
            return v.should.eventually.deep.equal({ a: 2 });
        });

        it('applies a transform to multiple items', () => {
            pipe._injectObject({ a: 1 });
            pipe._injectObject({ a: 1 });
            let v = pipe.eventually().with({ a: 2 }).valueOf();
            return v.should.eventually.deep.equal([{ a: 2 }, { a: 2 }]);
        });
    });

    xdescribe('dynamic values', () => {
        it('processes dynamic values in a merge transform', () => {
            let dv = new DynamicValue(() => 2);
            pipe._injectObject({ a: 1 });
            pipe.with({
                b: dv
            });

            let c = pipe.valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });

        it('processes dynamic values in a map transform', () => {
            let dv = new DynamicValue(() => 2);
            pipe._injectObject({ a: 1 });
            pipe.with(data => {
                data.b = dv;
                return data;
            });

            let c = pipe.valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });

        it('processes dynamic values in a map transform as an arg', () => {
            let dv = new DynamicValue(() => 2);
            pipe._injectObject({ a: 1 });
            pipe.with((data, args) => {
                data.b = args.dv;
                return data;
            }, {
                dv: dv
            });

            let c = pipe.valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });

        it('processes dynamic values asynchronously', () => {
            let dv = new DynamicValue(() => Promise.resolve(2));
            pipe._injectObject({ a: 1 });
            pipe.with({
                b: dv
            });

            let c = pipe.valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });

        it('processes deeply nested dynamic values', () => {
            let dv = new DynamicValue(() => 2);
            pipe._injectObject({ a: 1 });
            pipe.with({
                b: {
                    c: {
                        d: {
                            e: dv
                        }
                    }
                }
            });

            let c = pipe.valueOf();
            expect(c).to.deep.equal({ a: 1, b: 2 });
        });
    });
});