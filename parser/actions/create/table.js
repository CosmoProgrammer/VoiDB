const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function createTable(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${code.details.name}`);
    return code;
}

module.exports = createTable;