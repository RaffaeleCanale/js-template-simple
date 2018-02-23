const path = require('path');
const webpack = require('webpack');

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');

module.exports = {
    target: 'node',
    entry: path.join(dirSrc, 'index.js'),
    output: {
        filename: 'dist/bundle.js',
        // library: 'rightPad',
        // libraryTarget: 'umd'
    },
    resolve: {
        modules: [
            dirNode,
            dirSrc,
            dirAssets,
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ IS_DEV }),
        new webpack.ProvidePlugin({ _: 'lodash' }),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            options: {
                compact: true,
            },
        }],
    },
    devtool: IS_DEV ? 'eval-source-map' : undefined,
};
