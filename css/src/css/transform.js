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