const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const outputFile = pkg.name + '.js';

module.exports = {
    node : { fs: 'empty' },
    entry: {
        app: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'awesome-typescript-loader',
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        extensions: [ '.ts','.js' ]
    },
    plugins: [
        new CleanWebpackPlugin(['./lib']),
        new CheckerPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: pkg.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};