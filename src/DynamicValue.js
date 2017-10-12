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

    _invoke() {
        let r = this._fn();
        return (r instanceof Promise) ? r : Promise.resolve(r);
    }
}

module.exports = DynamicValue;