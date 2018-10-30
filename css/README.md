## 处理css  
1. 引入--loader  
style-loader: 创建一个style标签   
style-loader/url: 在html中插入一个link标签(配合file-loader使用),一个很小众的功能，会把每个import的css都处理成一个link标签，造成加载资源的增加，不利于优化       
file-loader: 生成一个新的css文件    
style-loader/useable: 在style中控制样式插入或者不插入，import了css后可以使用 .use() 或者 .unuse()的方法来控制样式是否插入  
css-loader: 允许js来import一个css文件     


```
npm install style-loader css-loader --save-dev
```
使用style-loader 和 css-loader 在html中添加style标签，并引入import中的样式  
```
var path = require('path')

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```

style-loader配合file-loader 使用在html中插入link标签并引入js中import的样式,注意：publicPath为指定打包后文件的路径     

```
var path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}
```

2. css modules   

3. 配置less/sass  

4. 提取css代码--使用缓存、提取公用代码  