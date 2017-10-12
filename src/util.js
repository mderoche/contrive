const flatMap = require('lodash/flatMap');

const objectPaths = (obj, parentKey = '') => {
    let result;
    if (obj instanceof Array) {
        let i = 0;
        result = flatMap(obj, obj => {
            return objectPaths(obj, `${parentKey}[${i++}]`);
        });
    } else if (typeof obj === 'object') {
        result = flatMap(Object.keys(obj), key => {
            return objectPaths(obj[key], key).map(subkey => {
                return `${(parentKey ? `${parentKey}.` : '')}${subkey}`;
            })
        });
    } else {
        result = [];
    }
    return result.concat(parentKey || []);
};

module.exports = {
    objectPaths: objectPaths
}