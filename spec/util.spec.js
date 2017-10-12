const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const util = require('../src/util');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('util', () => {
    it('can map out the paths of an object', () => {
        let o = {
            a: 'test',
            b: true,
            c: [{
                c2: 'test',
            }],
            d: {
                e: () => {},
                f: 5
            },
            w: {
                e: {
                    e: {
                        e: {
                            e: 'weeeeee'
                        }
                    }
                }
            }
        };

        let paths = util.objectPaths(o);
        expect(paths).to.deep.equal([
            'a',
            'b',
            'c[0].c2',
            'c[0]',
            'c',
            'd.e',
            'd.f',
            'd',
            'w.e.e.e.e',
            'w.e.e.e',
            'w.e.e',
            'w.e',
            'w'
        ]);
    });
});