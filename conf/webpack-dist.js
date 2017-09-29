const webpack = require('webpack');
const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const conf = require('./webpack');

let regular = cloneDeep(conf);
regular.output.path = path.resolve('./dist');
regular.output.filename = 'contrive.js';

let minified = cloneDeep(conf);
minified.output.path = path.resolve('./dist');
minified.output.filename = 'contrive.min.js';
minified.plugins = [
    new webpack.optimize.UglifyJsPlugin()
];

module.exports = [ regular, minified ];