class DynamicValue {
    constructor (fn) {
        this._fn = fn;
    }

    _getFn() {
        return this._fn;
    }

    _setFn(fn) {
        this._fn = fn;
    }

    exec() {
        let result = this._fn();

        if (result instanceof Promise) {
            return result;
        }

        return Promise.resolve(result);
    }
}

module.exports = DynamicValue;