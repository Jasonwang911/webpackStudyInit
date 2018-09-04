var webpack = require('webpack')
var path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'pageA': './src/pageA'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunk: 2
        })
    ],
    devtool: 'source-map',
}