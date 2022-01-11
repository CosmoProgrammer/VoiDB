const voidb = require('./index.js');
const fs = require('fs');

let c = fs.readFileSync('./testerCode.txt', 'utf8');
c = c.replace(/\r|\n/g, '');
console.log(voidb(c));