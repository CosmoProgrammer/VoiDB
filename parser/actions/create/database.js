const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function createDatabase(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${code.details.name}`);
    if(fs.existsSync(storagePath)){
        return new classes.Error("StorageError", "A database with that name already exists");
    } else {
        fs.mkdirSync(storagePath)
        if (preRunData[0]) return new classes.Success("Database created")
    }
}

module.exports = createDatabase;