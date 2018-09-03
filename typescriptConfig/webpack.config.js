module.exports = {
    mode: 'development',
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    devtool: 'source-map',
}