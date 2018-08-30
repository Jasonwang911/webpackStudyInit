module.exports = {
    mode: 'development',
    entry: {
        app: './app.js',
    },
    output: {
        path: require('path').resolve('./dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [    
            {
                test: /\.js$/,
                use: 'babel-loader',
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: [
                //             ['@babel/preset-env',
                //             {
                //                 targets: {
                //                     browsers: ['> 1%', 'last 2 versions']
                //                 }
                //             }]
                //         ]
                //     }
                // },
                // include: ['./app.js'],
                exclude: '/node_modules/'
            }
        ]
    }
}