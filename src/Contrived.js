const merge = require('lodash/merge');

class Contrived {
    constructor (payload) {
        this.payload = payload;
    }

    transform(t, args) {
        if (typeof t === 'function') {
            this.payload = t(this.payload, args);
        } else {
            this.payload = merge(this.payload, t);
        }
    }

    valueOf() {
        return this.payload;
    }
}

module.exports = Contrived;