import { a } from './common/util';
import base from './css/base.less';

console.log(a())

// 动态生成的节点
var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.className = 'bigBox';
app.appendChild(div);
