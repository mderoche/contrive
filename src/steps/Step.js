class Step {
    constructor (options) {
        this.options = options;
    }

    get options() {
        return this._options;
    }

    set options(o) {
        this._options = o;
    }

    _invoke () {
        throw 'step instance does not invoke';
    }
}

module.exports = Step;