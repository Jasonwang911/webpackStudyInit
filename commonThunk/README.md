##  提取公用代码

1. 提取公用代码的作用：   
    减少代码的冗余   
    提高用户的加载速度  
    单页面减少下载，多页面可以使用缓存   

2. webpack3.0 中的 commonsChunkPlugin  插件
    webpack的内置插件  webpack.optimize.CommonsChunkPlugin    
    配置项：    
        options.name / options.names   thunk的名称   
        options.filename               打包后的文件名称   
        options.minChunks              公用的次数（多少次会被提取）： 可以是数字、函数和     
        options.chunks                 指定提取代码的范围   
        options.children   
        options.deepChildren           是否在子模块看中继续提取公用代码   
        options.async                  创建一个异步的公共代码块   

3. 不同场景的配置   
    单页应用:    


    多页应用：   


    多页应用+第三方依赖+webpack生成代码   


4. 安装环境   
    npm install webpack --save-dev  


5. webpack4.0   webpack4 最大的改动就是废除了CommonsChunkPlugin 引入了 optimization.splitChunks   

如果你再webpack4中使用了weppack3的CommonsChunkPlugin 会出现以下报错： （运行配置文件 webpack3.config.js)    

Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks    

webpack3.config.js:    
```
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
``` 

webpack4 配置更加简单，如果设置了 mode 为 production，那么webpack4 会自动开启 Code Splitting   

6. webpack4内置的代码分割策略
    a. 新的chunk是否被共享或者来自node_module的模块   
    b. 新的chunk体积在压缩之前是否大于30kb  
    c. 按需加载chunk的并发请求数量小于等于5个  
    d. 页面初始加载时的并发请求数量小于等于3个   

7. 合理使用 Code Splitting  
    a. 基础类库  chunk-libs  : 比如 vue + vuex + vue-router + axios 这类的全家桶，一旦立项升级频率不高，但是每个文件基本都需要依赖   


    b. UI组件库 chunk-common : 比如 element-ui 升级频率也不会高，单独打包原因是体积比较大    


    c. 低频组件  ： 比如一些特定页面需要使用的第三方库文件--富文本编辑器等   

    d. 公用业务代码 : 比如vue的路由懒加载  component: () => import('./xxx.vue')  webpack默认会将其打包成一个独立的bundle

针对如上需求可进行如下配置： 
```
splitChunks: {
  chunks: "all",
  cacheGroups: {
    libs: {
      name: "chunk-libs",
      test: /[\/]node_modules[\/]/,
      priority: 10,
      chunks: "initial" // 只打包初始时依赖的第三方
    },
    elementUI: {
      name: "chunk-elementUI", // 单独将 elementUI 拆包
      priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
      test: /[\/]node_modules[\/]element-ui[\/]/
    },
    commons: {
      name: "chunk-comomns",
      test: resolve("src/components"), // 可自定义拓展你的规则
      minChunks: 2, // 最小共用次数
      priority: 5,
      reuseExistingChunk: true
    }
  }
};
```








    

    