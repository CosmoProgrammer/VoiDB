const voidb = require('./index.js');
const fs = require('fs');
const util = require('util')

let c = fs.readFileSync('./testerCode.txt', 'utf8');
c = c.replace(/\r|\n/g, '');
let lmao = voidb(c);
console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
for (let x in lmao) {
    console.log(util.inspect(lmao[x], false, null, true))
    console.log("********************************************************")
}
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");