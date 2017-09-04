var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        vendor: ['jquery', './src/js/common.js'],
        index: './src/js/index.js',
        cart: './src/js/cart.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            //     use: "css-loader"
            // })
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['index', 'cart', 'vendor'],
                mikchunks: 3
            }),
            new ExtractTextPlugin("index.css"),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                chunks: ['index', 'vendor'],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'cart.html',
                template: './src/cart.html',
                chunks: ['cart', 'vendor'],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new CleanWebpackPlugin(['./dist'], {
                root: path.join(__dirname, ''),
                verbose: true,
                dry: false
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
        // devtool: '#source-map'

}