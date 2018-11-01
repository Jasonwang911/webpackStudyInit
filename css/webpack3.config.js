var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './dist/',
        filename: '[name].bundle.js',
        
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#style',
                            singleton: true,
                            transform: './src/css/transform.js',
                        }
                    },
                    use: [
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
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: true
        })
    ]
}