var path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'app': './src/pageA'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    devtool: 'source-map',
}