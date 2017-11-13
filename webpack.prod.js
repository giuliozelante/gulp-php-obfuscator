const webpack = require('webpack');
const merge = require('webpack-merge');
// const ClosureCompilerPlugin = require('webpack-closure-compiler');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        //new ClosureCompilerPlugin({mode: 'AGGRESSIVE_BUNDLE'}),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});