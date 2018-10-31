var path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './dist/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#style',
                            singleton: true,
                            transform: './src/css/transform.js',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#style',
                            singleton: true,
                            transform: './src/css/transform.js',
                        }
                    },
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
            }
        ]
    }
}