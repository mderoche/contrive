const expect = require('chai').expect;
const contrive = require('../../src');

let bill = {
    cost: 50,
    guests: 4
};

let tip = (thing, args) => {
    thing.cost = thing.cost + (thing.cost * (args.percent / 100));
    return thing;
};

let tableNumber = (thing, args) => {
    thing.table = args.i;
    return thing;
};

let restaurantName = {
    restaurant: 'Food Place'
};

describe('scenario:  restaurant bill', () => {
    it('contrives a bill', () => {
        let c = contrive.a(bill)
            .valueOf();

        expect(c).to.deep.equal({ cost: 50, guests: 4 });
    });

    it('contrives a bill with tip', () => {
        let c = contrive.a(bill)
            .with(tip, { percent: 20 })
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4 });
    });

    it('contrives a bill with tip and table number', () => {
        let c = contrive.a(bill)
            .with(tip, { percent: 20 })
            .with(tableNumber)
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4, table: 0 });
    });

    it('contrives a bill with tip and table number and restaurant name', () => {
        let c = contrive.a(bill)
            .with(tip, { percent: 20 })
            .with(tableNumber)
            .with(restaurantName)
            .valueOf();

        expect(c).to.deep.equal({ cost: 60, guests: 4, table: 0, restaurant: 'Food Place' });
    });

    it('contrives several bills with tip and table number and restaurant name', () => {
        let c = contrive.a({
                cost: 50,
                guests: 4
            })
            .times(5)
            .with(tip, { percent: 20 })
            .with(tableNumber)
            .with(restaurantName)
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
