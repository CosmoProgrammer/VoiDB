const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function selectDatabases(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage');
    let databasesFinder = source =>
            fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    try{
        return new classes.Data(databasesFinder(storagePath), 'List of All Databases in Storage');
    } catch(e){
        if(e.code === 'ENOENT'){
            return new classes.Error('StorageError', 'Storage does not exist');
        }
    }
}

module.exports = selectDatabases;