## 处理css  
   

### 引入--loader  
1. style-loader: 创建一个style标签   
2. style-loader/url: 在html中插入一个link标签(配合file-loader使用),一个很小众的功能，会把每个import的css都处理成一个link标签，造成加载资源的增加，不利于优化       
3. file-loader: 生成一个新的css文件    
4. style-loader/useable: 在style中控制样式插入或者不插入，import了css后可以使用 .use() 或者 .unuse()的方法来控制样式是否插入  
5. css-loader: 允许js来import一个css文件     


```
npm install style-loader css-loader --save-dev
```   

#### 使用style-loader 和 css-loader 在html中添加style标签，并引入import中的样式  
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

#### style-loader配合file-loader 使用在html中插入link标签并引入js中import的样式,注意：publicPath为指定打包后文件的路径     

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

#### 使用style-loader/useable 
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
                        loader: 'style-loader/useable'
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
```

### style-loader 的一些常用配置 options  

#### insertAt: 插入位置   top bottom 
#### insertInto: 插入到dom 
按照文档来写尝试失败： 文档地址 
[style-loader](https://www.npmjs.com/package/style-loader) 

找到答案： 在html中引入的webpack编译好的js文件需要在页面底部引入，如果在header引入，因为加载问题，获取不到相应的dom   

#### singleton: 是否只使用一个style标签,会将多个引入混合为一个style标签插入页面   
```
{
    loader: 'style-loader',
    options: {
        singleton: true
    }
}
``` 
#### transform: 可以执行一个js，在loader执行的时候执行，也就是浏览器环境，能拿到浏览器的相关信息  
transform.js   
```
// 在loader执行的时候执行，也就是浏览器环境，能拿到浏览器的相关信息
module.exports = function(css) {
    
    if(window.innerWidth > 400) {
        // css += 'html{background: aqua;}'
        css = css.replace('red', 'aqua')
    }else {
        css = css.replace('aqua', 'red')
    }
    console.log(css);
    return css;
}
```
webpack配置   
```
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
```

## css-loader 
alias: 解析别名  
importLoader: 取决于css-loader之前有没有其他的loader作用，比如配置less、sass才会有用（@import）  
Minimize: 是否压缩 
modules: 是否启用
    定义css-modules的名称： localIndentName: '[path][name]_[local]--[hash:base64:5]'


### css modules  
基本语法:    
    :local    给定一个本地的局部样式   
    :global   给定一个本地的全局样式    
    compose   继承一段样式    
    compose ... from path  从其他css中引入一段样式   

base.css:   
```
html{
    background: red;
}

.box{
    composes: bigBox from './common.css';
    width: 200px;
    height: 200px;
    border-radius: 10px;
    background: skyblue;
}
```

common.css:  
```
body{
    font-size: 40px;
}

.bigBox {
    border: 4px solid darkgreen;
}
```

app.js入口文件：  
```
import base from './css/base.css';
import common from './css/common.css';


var app = document.getElementById('app');
console.log(app)
app.innerHTML = '<div class="'+ base.box +'"></div>'
```

### 配置less/sass 
安装相关依赖   
less-loader less    
sass-loader node-sass   

添加一个rules规则：  
```
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
```


### 提取css代码--使用缓存、提取公用代码  
webpack3中使用：  
1. extract-loader  
2. ExtractTextWebpackPlugin（主流）: webpack4中已经移除，在webpack4中使用需要 extract-text-webpack-plugin@next   

安装插件：npm install extract-text-webpack-plugin@next webpack --save-dev  

- filename: 打包后的文件的名称 
- allChunks: false (默认是false，只会提取初始化的，不提取异步加载)     
- ExtractTextWebpackPlugin.extract:    
    fallback: 以何种方式插入到页面之中  
    use: 使用的loader  

```
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
        filename: '[name].bundle.js'
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
            filename: '[name].min.css'
        })
    ]
}
```

webpack4新的CSS文件提取插件mini-css-extract-plugin；  

```
var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
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
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         // insertInto: '#style',
                    //         // singleton: true,
                    //         // transform: './src/css/transform.js',
                    //     }
                    // },
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
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].min.css",
            chunkFilename: "[name].css"
        })
    ],
}
```

## PostCss
a tool for tansforming CSS with JavaScript;  运行的时机是打包的时候。一个处理css的工具，包括生态中的一些插件。  

```
npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev  
```

### Autoprefixer : 补全前缀  

### CSS-nano ： 优化并压缩css  css-loader就是使用这个插件来做的   

### CSS-next ： css变量 自定义选择器等


ident: 指定插件的使用者。  
plugins数组中导入的插件需要调用。  

```
{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('autoprefixer')(),
        ]
    }
},
```

设置兼容都需要配置 Broswerslint


## post-import 和 postcss-url