class Step {
    constructor (payload) {
        this._payload = payload;
    }

    _getPayload() {
        return this._payload;
    }

    _setPayload(payload) {
        this._payload = payload;
    }

    exec () {
        throw 'unimplemented exec';
    }
}

module.exports = Step;