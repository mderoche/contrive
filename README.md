# contrive

[![Build Status](https://travis-ci.org/mderoche/contrive.svg?branch=master)](https://travis-ci.org/mderoche/contrive)
[![Coverage Status](https://coveralls.io/repos/github/mderoche/contrive/badge.svg?branch=master)](https://coveralls.io/github/mderoche/contrive?branch=master)

*contrive* is a small library to manage mocking data for automated testing.  Instead of copy-pasting
an object multiple times with small changes for each test case, provide one basic object, and transform
it as needed.

Runs in Node and the browser.

```
contrive
    .a(bill)
    .times(5)
    .with(tip)
    .with(tableNumber)
    .valueOf();
```

## API

### contrive.a|an|the(thing)

Creates a pipeline, injecting the `thing`.

```
let bill = { cost: 50 };
contrive.a(bill).valueOf();

// { cost: 50 }
```

### .times(n)

Clones the last `thing` in the pipline **n** times, adding all copies back into the pipeline.

```
let bill = { cost: 50 };
contrive.a(bill).times(2).valueOf();

// [{ cost: 50 }, { cost: 50 }]
```

### .with(fn[, args]) - Map Transform

Applies a function `fn` to each `thing` in the pipline.

Aapplied with parameters: `(thing, args)`, where:

* `thing` is the `thing` being transformed
* `args` is an optional object of arguments passed in through the second parameter of `.with()`
* `args.i` represents the index of the `thing` in the pipeline

Function `fn` should return the modified `thing`.

```
let bill = { cost: 50 };

let tableNumber = function (thing, args) {
    thing.table = args.i;
    return thing;
};

contrive.a(bill)
    .times(2)
    .with(tableNumber)
    .valueOf();

// [{ cost: 50, table: 0 }, { cost: 50, table: 1 }]
```

### .with(object) - Merge Transform

Merges the `object` into each `thing` in the pipeline.  On collisions, values in the `thing`
will be overwritten by values in the `object`.

```
let bill = { cost: 50 };
let coupon = { coupon: 'fr33f00d' };

contrive.a(bill)
    .with(coupon)
    .valueOf();

// { cost: 50, coupon: 'fr33f00d' }
```

### .valueOf()

Collapses the pipeline, running all transforms on each `thing` in the pipeline.

If there is only one `thing` in the pipeline, `.valueOf()` will return it alone.  If there are more than
one `things` in the pipline, it will return an array of those `things`.

```
let bill = { cost: 50 };

let tip = function (thing, args) {
    thing.cost = thing.cost + (thing.cost * args.tipPercent);
    return thing;
};

let tableNumber = function (thing, args) {
    thing.table = args.i;
    return thing;
};

let coupon = { coupon: 'fr33f00d' };

contrive.a(bill)
    .times(2)
    .with(tip, {
        tipPercent: 0.20
    })
    .with(coupon)
    .with(tableNumber)
    .valueOf();

// [
//     { cost: 60, coupon: 'fr33f00d', table: 0 },
//     { cost: 60, coupon: 'fr33f00d', table: 1 }
// ]
```

### .eventually() - Asynchronous Usage

Converts a pipeline to an asynchronous pipeline.

* Causes `.valueOf()` to return a promise, which resolves with the collapsed pipeline result
* Enables transforms to return promises that resolve with their transformed `things`.

```
let bill = { cost: 50 };

let discount = function (thing, args) {
    let discounted = thing.cost - (thing.cost * 0.10);
    return Promise.resolve({ cost: discounted });
};

contrive.a()
    .with(discount)
    .valueOf()
    .then(function (bill) {
        console.log(bill);
    });

// { cost: 45 }
```

## License

MIT