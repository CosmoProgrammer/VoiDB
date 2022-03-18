const voidb = require('./index.js');
const fs = require('fs');

let c = fs.readFileSync('./testerCode.txt', 'utf8');
c = c.replace(/\r|\n/g, '');
let lmao = voidb(c);
console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
for(let x in lmao) {
    console.log(lmao[x]);
    console.log("********************************************************")
}
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");