## babel 的配置
1. webpack4对UglifyJsPlugin进行了改变，在配置文件（默认为webpack.config.js）或者package.json的执行脚本 "script"中需要指定环境，默认 mode 环境为 production 为压缩代码，配置环境中需要添加 mode: 'development', package.json中需要 --mode development 来取消压缩代码。  
2. 安装babel：   
    准备环境  sudo npm install webpack webpack-cli -g   安装后可执行 webpack 命令  
    安装babel  npm install @babel/core babel-loader --save-dev   
3. webpack 命令  
    webpack entry<entry> output    
    webpack --config <webpack.config.js>   
4. webpack同时支持 es6 module、commonjs规范、AMD规范 

es6 module 规范 
```
import sum from './sum';

export default function(a, b) {
    return a + b;
}
```  

commonjs 规范
```
var minus = require('./minus');

module.exports = function(a, b) {
    return a - b;
}
```

由于 AMD 是异步加载，所以会额外打包出文件，注意修改打包路径
```
define([
    'require',
    'dependency'
], function (require, factory) {
    return function(a, b) {
        return a * b;
    }
})

require(['./muti], function(muti){
    console.log(muti(2,4))
})
```  

## babel-loader
1. 安装依赖  npm install @babel/core babel-loader --save-dev
2. 配置webpack配置文件 
```
    module: {
        rules: [    
            {
                test: /\.js$/,
                use: 'babel-loader',
                // include: ['./app.js'],
                exclude: '/node_modules/'
            }
        ]
    }
```


## babel-preset  针对语法
1.  env包括 es2015/es2016/es2017/latest     
    一些特殊的preset babel-preset-react   
    babel-preset-stage 0-3  还未发布的一些预设   
2. 安装 babel-preset   npm install @babel/preset-env --save-dev  
3. 配置文件中设置babel-preset 
```
    module: {
        rules: [    
            {
                test: /\.js$/,
                use: {
                    loader: 'bable-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                // include: ['./app.js'],
                exclude: '/node_modules/'
            }
        ]
    }
```
4. target 参数  根据指定的目标选择性的进行编译   
    targets     
    targets.browsers   'last 2 versions'    '> 1%'    从一个开源项目 browserslist  和  can i use  
```
    module: {
        rules: [    
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                // include: ['./app.js'],
                exclude: '/node_modules/'
            }
        ]
    } 
``` 

5. 在 .babelrc 文件中配置   
```
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["last 2 version", "not ie <= 6"]
            }
        }]
    ]
}
```  


## babel-plugin  针对函数和方法   arr.include  new Set()  Generator Map  Array.from    Array.prototype.includes 这些方法都没有被babel处理
1. babel-polifill  全局垫片，打包后代码量大，影响全局,适合产品开发  
    安装： npm install babel-polyfill --save   
    在入口文件中使用: import 'babel-polyfill'   

2. babel-runtime-transform  局部垫片，打包后代码量少，不污染全局，适合开发插件    
    安装： npm install @babel/plugin-transform-runtime --save-dev     
          npm install @babel/runtime --save   
```
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["last 2 version", "not ie <= 6"]
            }
        }]
    ],
    "plugins": ["@babel/transform-runtime"]
}
```
       
    