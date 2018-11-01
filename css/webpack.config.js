var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                // {
                //     loader: 'style-loader',
                //     options: {
                //         // insertInto: '#style',
                //         // singleton: true,
                //         // transform: './src/css/transform.js',
                //     }
                // },
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
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
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].min.css",
            chunkFilename: "[name].css"
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    // name: 'styles',
                    // test: /\.less$/,
                    chunks: 'all', // merge all the css chunk to one file
                    // enforce: true
                }
            }
        }
    }
}