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
                            singleton: true,
                            transform: './src/css/transform.js',
                        }
                    },
                    {
                        loader: 'css-loader'
                        // loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}