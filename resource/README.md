# webpack4 文件处理（图片处理、字体处理、第三方js库）

## 图片处理
css中引入图片：   file-loader   
自动合成雪碧图：  postcss-sprites   
压缩图片：  img-loader  
Base64编码：  url-loader

> 关于css引入图片的处理
```
{
    test: /\.(png|jpg|jepg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                publicPath: '',
                outputPath: 'dist/',
                useRelativePath: true
            }
        }
    ]
}
```

> 设置Base64编码的大小  url-loader 和 file-loader 作用相同，只是多了一个对base64图片处理的功能
```
{
    test: /\.(png|jpg|jepg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 10000,
                publicPath: '',
                outputPath: 'dist/',
                useRelativePath: true
            }
        }
    ]
}
```

> 压缩图片 image-webpack-loader 注意，压缩图片loader必须放到url-loader或者file-loader之后
尝试了img-loader:   
img-loader需要根据不同的图片格式引入不同的插件，对于png格式的图片，可以使用imagemin-pngquant，并指定压缩率   
```
{
    loader: 'img-loader',
    options: {
        plugins: [
            require('imagemin-pngquant')({
                quality: '80'
            })
        ]
    }
}
```
但是对于jpg图片，npm包img-loader提供的imagesmin-mozjpeg插件安装后webpack4.0启动会报错，将目前插件7.0.0版本回退到6.0.0后webpack编译成功，但是jpg图片并没有被压缩。

于是尝试了image-webpack-loader：  

```
{
    loader: 'image-webpack-loader',
    options: {
        bypassOnDeBug: true
    }
}
```