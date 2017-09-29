# contrive

*contrive* is a small library to manage mocked data for automated testing.  With contrive, you provide
a set of basic data, then transform it as needed for various test situations.

## Synopsis
```
// contrive a basic object
contrive
    .a(<thing>)
    .valueOf();

// contrive an object, then transform it
contrive
    .a(<thing>)
    .with(<some transform>)
    .with(<some transform>)
    .with(<some transform>)
    .valueOf();

// contrive an object several times
contrive
    .a(<thing>)
    .times(5)
    .valueOf();
```

## API

### contrive.a(object), contrive.an(object)

Creates a chain, adding the `object` as the first (and possibly only) conrived object.

### .times(n)

Clones the contrived object **n** times, adding them all to the chain.

### .with(fn[, args])

Transforms each contrived object in the chain with a function, `(payload, args)`, where `payload` is the contrived object,
and `args` is an optional object of arguments passed in through the second parameter of `.with()`.

### .with(object)

Transforms each contrived object in the chain with an object.  This object is merged into the contrived object, overwriting keys
on collisions.

### .valueOf()

Returns the primitive value of the contrived object(s) in the chain, and ends the chain.

If there is only one contrived object in the chain, `.valueOf()` will return an object.  If there are more than one contrived
objects in the chain, will return an array.

## License

MIT