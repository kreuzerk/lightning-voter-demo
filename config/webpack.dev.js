const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'polyfills': './public/polyfills.ts',
        'vendor': './public/vendor.ts',
        'app': './public/main.ts',
        'ng1': './public/index.ts'
    },

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills', 'ng1']
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
};