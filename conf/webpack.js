const path = require('path');

module.exports = {
    entry: path.resolve('./src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve('./.tmp'),
        filename: 'contrive.js',
        library: 'contrive',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: []
};