const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const Contrived = require('./Contrived');

class ContrivedSet {
     constructor (base) {
        this.contrived = [ new Contrived(base) ];
    }

    times(n) {
        if (typeof n !== 'number') {
            throw new Error('ContrivedSet.times requires an integer');
        }

        let peek = this.contrived[this.contrived.length - 1];

        this.contrived = this.contrived.concat(
            new Array(n - 1).fill(cloneDeep(peek))
        );

        return this;
    }

    with(transform, args = {}) {
        this.contrived.forEach((c, i) => {
            let clonedArgs = cloneDeep(args);
            clonedArgs.i = i;

            return c.transform(transform, clonedArgs);
        });
        return this;
    }

    valueOf() {
        let payloads = this.contrived.map(contrived => contrived.valueOf());
        return payloads.length > 1 ? payloads : payloads[0];
    }
}

module.exports = ContrivedSet;