const path = require('path');


function preRunCheck(){
    let config = require(`${__dirname}/config.json`)
    let messageMode=config['messageMode'];
    let usingDatabase=config['usingDatabase'];
    return [messageMode, usingDatabase];
}

module.exports = preRunCheck;