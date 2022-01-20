const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function deleteTable(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`, `${code.details.table}.json`);
    try {
        fs.unlinkSync(storagePath);
    } catch (e) {
        return new classes.Error("StorageError", `Table with that name does not exist in the database ${preRunData[1]}`);
    }
    if(preRunData[0]) return new classes.Success(`Deleted table called ${code.details.table} in the database ${preRunData[1]}`);
}

module.exports = deleteTable;