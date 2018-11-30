# Three Shaking : 删除冗余代码，常规优化和引入第三方库

## JS Three Shaking  
webpack在2.0以后会标识多余代码
webpack.optimize.uglifyJS 来移除这些被标识的代码

npm run pord 才开启tree shaking
npm webpack-deep-scope-plugin (深度tree shaking)

## CSS Three Shaking
需要借助 Purify CSS  
安装依赖： npm instal purify-css purifycss-webpack glob-all --save-dev  
 
option：  
    path: glob.sync([])   // npm install glob-all --save-dev   处理多路径

```
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
```

