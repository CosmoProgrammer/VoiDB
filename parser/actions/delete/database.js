const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function deleteDatabase(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${code.details.database}`);
    console.log(storagePath);
    try{fs.rmdirSync(storagePath, { recursive: true })} catch(e){
        return new classes.Error('StorageError', `Database ${code.details.database} does not exist`);
    };
    if(preRunData[0]) return new classes.Success(`Deleted the database called ${code.details.database}`);
}

module.exports = deleteDatabase;