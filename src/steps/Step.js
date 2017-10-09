class Step {
    constructor (options) {
        this._options = options;
    }

    _getOptions() {
        return this._options;
    }

    _getOptions(options) {
        this._options = options;
    }

    exec () {
        throw 'unimplemented exec';
    }
}

module.exports = Step;