const expect = require('chai').expect;
const contrive = require('../src');

describe('times', () => {
    it('returns the contrived set for chaining', () => {
        expect(contrive.a({ a: 1 }).times(1))
            .to.be.an.instanceof(contrive.ContrivedSet);
    });

    it('throws an error if given invalid values', () => {
        expect(() => contrive.a({}).times()).to.throw();
        expect(() => contrive.a({}).times('1')).to.throw();
        expect(() => contrive.a({}).times(true)).to.throw();
        expect(() => contrive.a({}).times(() => {})).to.throw();
        expect(() => contrive.a({}).times({})).to.throw();
        expect(() => contrive.a({}).times(Infinity)).to.throw();
        expect(() => contrive.a({}).times(-Infinity)).to.throw();
        expect(() => contrive.a({}).times([])).to.throw();
    });

    it('does nothing if times = 1', () => {
        let cs = contrive.a({ a: 1 }).times(1);

        expect(cs.contrived).to.be.an.instanceof(Array);
        expect(cs.contrived.length).to.be.equal(1);
        expect(cs.contrived[0]).to.deep.equal({ payload: { a: 1 } });
    })

    it('clones if times > 1', () => {
        let cs = contrive.a({ a: 1 }).times(2);

        expect(cs.contrived).to.be.an.instanceof(Array);
        expect(cs.contrived.length).to.be.equal(2);

        cs.contrived.forEach(c => {
            expect(c).to.deep.equal({ payload: { a: 1 } });
        });
    });

    it('clones transformed payloads', () => {
        let cs = contrive.a({ a: 1 }).with({ b: 2 }).times(2);

        expect(cs.contrived).to.be.an.instanceof(Array);
        expect(cs.contrived.length).to.be.equal(2);

        cs.contrived.forEach(c => {
            expect(c).to.deep.equal({ payload: { a: 1, b: 2 } });
        });
    });
});