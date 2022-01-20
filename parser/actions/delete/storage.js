const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function deleteStorage(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage');
    try{fs.rmdirSync(storagePath, { recursive: true })} catch(e){
        return new classes.Error('StorageError', 'Somehow, storage does not exist to be able to delete.')
    };
    if(preRunData[0]) return new classes.Success(`Deleted storage`)
}

module.exports = deleteStorage;