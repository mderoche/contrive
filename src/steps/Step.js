class Step {
    constructor (options, async) {
        this._options = options;
        this._async = async;
    }

    _getOptions() {
        return this._options;
    }

    _setOptions(options) {
        this._options = options;
    }

    _isAsync() {
        return this._async;
    }

    _invoke () {
        throw 'unimplemented';
    }
}

module.exports = Step;