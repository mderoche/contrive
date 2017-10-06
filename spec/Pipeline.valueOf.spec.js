const expect = require('chai').expect;
const contrive = require('../src');

describe('valueOf', () => {
    describe('sync', () => {
        it('returns a single object if there is only 1 object', () => {
            let c = contrive.a({ a: 1 })
                .valueOf();

            expect(c).to.deep.equal({ a: 1 });
        });

        it('returns an array if there are >1 objects', () => {
            let c = contrive.a({ a: 1 })
                .times(2)
                .valueOf();

            expect(c).to.deep.equal([{ a: 1 }, { a: 1 }]);
        });
    });

    describe('async', () => {
        it('returns a promise', () => {
            let c = contrive.a({ a: 1 })
                .eventually()
                .valueOf();

            expect(c).to.be.an.instanceOf(Promise);
        });

        it('resolves with the value for 1 object', () => {
            let c = contrive.a({ a: 1 })
                .eventually()
                .valueOf();
            
            return c.should.eventually.deep.equal({ a: 1 });
        });


        it('resolves with an array of values for >1 object2', () => {
            let c = contrive.a({ a: 1 })
                .eventually()
                .times(2)
                .valueOf();
            
            return c.should.eventually.deep.equal([{ a: 1 }, { a: 1 }]);
        });

    });
});