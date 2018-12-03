# webpack4 文件处理（图片处理、字体处理、第三方js库）

## 图片处理
css中引入图片：   file-loader   
自动合成雪碧图：  postcss-sprites   
压缩图片：  img-loader  
Base64编码：  url-loader

关于css引入图片的处理
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

设置Base64编码的大小  url-loader 和 file-loader 作用相同，只是多了一个对base64图片处理的功能
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