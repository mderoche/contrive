const _ = require('lodash');

let users = {
    a: {
        stuff: 1,
        wowArray: [
            'something'
        ],
        b: {
            moreStuff: 2,
            lol: 3,
            dynamic: () => {
                return new Promise((yay, nay) => {
                    setTimeout(() => {
                        yay('woo!');
                    }, 100);
                });
            }
        }
    }
};

const paths = (obj, parentKey = '') => {
    let result;
    if (obj instanceof Array) {
        let i = 0;
        result = _.flatMap(obj, obj => {
            return paths(obj, `${parentKey}[${i++}]`);
        });
    } else if (typeof obj === 'object') {
        result = _.flatMap(Object.keys(obj), key => {
            return paths(obj[key], key).map(subkey => {
                return `${(parentKey ? `${parentKey}.` : '')}${subkey}`;
            })
        });
    } else {
        result = [];
    }
    return result.concat(parentKey || []);
}

const dynamicPaths = object => {
    let dynamics = paths(object)
        .filter(path => _.get(object, path) instanceof Function)
        .map(path => _.get(object, path))
        .map(dynamic => dynamic());

    return Promise.all(dynamics);
};

dynamicPaths(users).then(res => {
    console.log(res);
})