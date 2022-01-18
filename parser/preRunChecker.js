const path = require('path');
const fs = require('fs');

function preRunCheck(){
    let config = require(`${__dirname}/config.json`)
    if(!(fs.existsSync(path.join(__dirname, '../', 'storage')))){ fs.mkdirSync(`./storage`) }
    let messageMode=config['messageMode'];
    let usingDatabase=config['usingDatabase'];
    return [messageMode, usingDatabase];
}

module.exports = preRunCheck;