const expect = require('chai').expect;
const contrive = require('../../src');

describe('scenario:  restaurant bill', () => {
    contrive.object('bill', {
        cost: 50,
        guests: 4
    });

    contrive.transform('tip', (object, args) => {
        object.cost = object.cost + (object.cost * (args.percent / 100));
        return object;
    });

    contrive.transform('table-number', (object, args) => {
        object.table = args.i;
        return object;
    });

    contrive.transform('restaurant-name', {
        restaurant: 'Food Place'
    });

    it('contrives a bill', () => {
        let c = contrive.a('bill').valueOf();
        expect(c).to.deep.equal({ cost: 50, guests: 4 });
    });

    it('contrives a bill with tip', () => {
        let c = contrive.a('bill')
            .with('tip', { percent: 20 })
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4 });
    });

    it('contrives a bill with tip and table number', () => {
        let c = contrive.a('bill')
            .with('tip', { percent: 20 })
            .with('table-number')
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4, table: 0 });
    });

    it('contrives a bill with tip and table number and restaurant name', () => {
        let c = contrive.a('bill')
            .with('tip', { percent: 20 })
            .with('table-number')
            .with('restaurant-name')
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4, table: 0, restaurant: 'Food Place' });
    });

    it('contrives several bill with tip and table number and restaurant name', () => {
        let c = contrive.a('bill')
            .times(5)
            .with('tip', { percent: 20 })
            .with('table-number')
            .with('restaurant-name')
            .valueOf();

        let expected = [
            { cost: 60, guests: 4, table: 0, restaurant: 'Food Place' },
            { cost: 60, guests: 4, table: 1, restaurant: 'Food Place' },
            { cost: 60, guests: 4, table: 2, restaurant: 'Food Place' },
            { cost: 60, guests: 4, table: 3, restaurant: 'Food Place' },
            { cost: 60, guests: 4, table: 4, restaurant: 'Food Place' }
        ];

        expect(c).to.deep.equal(expected);
    });
});