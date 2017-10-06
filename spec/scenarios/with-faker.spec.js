const faker = require('faker');
const contrive = require('../../src');

contrive.object('invoice', {
    name: contrive.dynamicValue(() => {
        return faker.name.findName();
    }),
    due: 100
});

let c = contrive.an('invoice')
    .times(2)
    .with(invoice => {
        invoice.name = faker.name.findName();
        return invoice;
    })
    .valueOf();

console.log(c);