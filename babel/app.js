// import 'babel-polyfill'

// es6 module
import sum from './sum';
// commonjs 规范
var minus = require('./minus');
// amd 规范
// require(['./muti'], function(muti) {
//     console.log(muti(2,4));
// })


console.log('sum(1, 2)', sum(1, 2));
console.log('minus(2,1)', minus(2,1));

const NUM = 12;

let fn = () => {

}

let arr = [1, 2, 3].map(item => item*2)

console.log(arr)