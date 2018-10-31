// import base from './css/base.css'
// import common from './css/common.css'

// var flag = false;
 
// setInterval(function() {
//     if(flag) {
//         base.use();
//     }else {
//         base.unuse();
//     }
//     flag = !flag;
// },500)

import base from './css/base.css';
import common from './css/common.css';


var app = document.getElementById('app');
console.log(app)
app.innerHTML = '<div class="'+ base.box +'"></div>'