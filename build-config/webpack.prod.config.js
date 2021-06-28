'use strict';
var webpack = require("webpack");
var path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: path.resolve("dist/bundle"),
        filename: "[name].bundle.vaccine-map.[chunkhash].js",
        chunkFilename: "[name].vaccine-map.js"
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new TerserPlugin({
        parallel: true,
        terserOptions: {
            ecma: 6
        }
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: './src/assets/index.template.html'
    })
    ],
    module: {
        rules: require("./rules.config"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}
