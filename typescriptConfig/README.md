## Typescript 的配置

1. TS: js的超集 tslang.cn/typescriptlang.org  

2. typesscript-loader 有两个    
    ts-loader                   官方维护   
    awesome-typesctipt-loader   个人维护，运用了缓存，速度更快   

3. 配置在 tsconfig.json 文件中   
    官网中： 官网/docs/handbook/compiler-options.html 查看相关具体配置  
    常用选项：   
        compilerOptions  
        include   
        exculde  

4. 安装环境   
    sudo npm install typescript -g   
    npm install webpack typescript ts-loader awesome-typescript-loader --save-dev    
    在我安装依赖的时候出现 项目中 typesctipt 下载失败的情况，此时因为全局安装有 typescript ，可以直接链接过来，使用命令
    npm link typescript   

5. 配置webpack.config.js文件   
```
module.exports = {
    mode: 'development',
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    devtool: 'source-map',
}
```

6. 配置tsconfig.json配置文件(注意json文件不可以写注释)
```
{
    "compilerOptions": {
        // 包含es6 es7 和commonjs
        "module": "commonjs", 
        // 目标运行环境
        "target": "es5",
        // 是不是允许 js语法 
        "allowJs": true,
    },
    "include": [
        "./src/*"
    ],
    "exclude": [
        "./node_modules"
    ]
}
```

7. 使用第三方库的声明文件（校验第三方库文件的数据类型） 
    npm install @types/lodash       
    npm install @types/vue      
    。。。。        

    或者使用  Typings   

    a.全局安装  sodu npm install typings -g      
    b.使用typings 安装 typings install lodash --save  安装完成后会自动生成 typings.json 配置文件和 typings 文件夹    
    c.在tsconfig.json文件中添加 typeRoots 配置     
```
{
    "compilerOptions": {
        "module": "commonjs", 
        "target": "es5",
        "allowJs": true,
        "typeRoots": [
            "./node_modules/@types",
            "./typings/modules"
        ]
    },
    "include": [
        "./src/*"
    ],
    "exclude": [
        "./node_modules"
    ]
}
```

    
        