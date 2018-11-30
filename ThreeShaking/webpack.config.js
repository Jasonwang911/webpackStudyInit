var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var PurifyCSS = require("purifycss-webpack");
var glob = require("glob-all");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                },
                {
                    loader: 'less-loader'
                }
            ]
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
            chunkFilename: "[name].css"
        }),
        new PurifyCSS({
            paths: glob.sync([
                // 要做CSS Tree Shaking的路径文件
                path.resolve(__dirname, "./*.html"),
                path.resolve(__dirname, "./src/*.js")
            ])
        })
    ]

}