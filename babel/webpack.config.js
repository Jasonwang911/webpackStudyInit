module.exports = {
    mode: 'development',
    entry: {
        app: './app.js',
    },
    output: {
        path: require('path').resolve('./'),
        filename: 'bundle.js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             loader: 'babel-loader',
    //             // include: ['./app.js'],
    //             exclude: '/node_module/'
    //         }
    //     ]
    // }
}