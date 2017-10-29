const TimesStep = require('./steps/TimesStep');
const MergeTransformStep = require('./steps/MergeTransformStep');
const MapTransformStep = require('./steps/MapTransformStep');

async function invokeAsyncSteps(things, steps) {
    for (const step of steps) {
        things = await step._invoke(things, { async: true });
    }
    return things;
}

class Pipeline {
    constructor () {
        this._things = [];
        this._queue = [];
        this._async = false;
    }

    get things() {
        return this._things;
    }

    set things(things) {
        this._things = things;
    }

    get queue() {
        return this._queue;
    }

    set queue(queue) {
        this._queue = queue;
    }

    get async() {
        return this._async;
    }

    set async(async) {
        this._async = async;
    }

    _inject(thing) {
        this._things.push(thing);
        return this;
    }

    _enqueue(step) {
        this._queue.push(step);
        return this;
    }

    _compressValueOf(value) {
        return value.length > 1 ? value : value[0];
    }

    eventually() {
        this._async = true;
        return this;
    }

    times(n) {
        let step = new TimesStep({
            n: n
        });
        this._enqueue(step);
        return this;
    }

    with(transform, args) {
        if (typeof transform === 'object') {
            this._enqueue(
                new MergeTransformStep({
                    mergeWith: transform
                })
            );
        }

        if (typeof transform === 'function') {
            this._enqueue(
                new MapTransformStep({
                    fn: transform,
                    args: args
                })
            );
        }

        return this;
    }

    valueOf() {
        if (this.async) {
            return invokeAsyncSteps(
                this.things,
                this.queue
            ).then(o => this._compressValueOf(o));
        } else {
            let things = this.things;

            this.queue.forEach(step => {
                things = step._invoke(things);
            });

            return this._compressValueOf(things);
        }
    }
}

module.exports = Pipeline;