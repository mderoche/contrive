class Step {
    constructor (options) {
        this._options = options;
    }

    _getOptions() {
        return this._options;
    }

    _setOptions(options) {
        this._options = options;
    }

    _invoke () {
        throw 'unimplemented';
    }
}

module.exports = Step;