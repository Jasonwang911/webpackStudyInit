## babel 的配置
1. webpack4对UglifyJsPlugin进行了改变，在配置文件（默认为webpack.config.js）或者package.json的执行脚本 "script"中需要指定环境，默认 mode 环境为 production 为压缩代码，配置环境中需要添加 mode: 'development', package.json中需要 --mode development 来取消压缩代码。  
2. 安装babel：   
    准备环境  sudo npm install webpack webpack-cli -g   安装后可执行 webpack 命令  
    安装babel  npm install @babel/core babel-loader --save-dev   
3. webpack 命令  
    webpack entry<entry> output    
    webpack --config <webpack.config.js>   
4. webpack同时支持 es6 module、commonjs规范、AMD规范   

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