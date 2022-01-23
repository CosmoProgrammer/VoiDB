const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function selectTables(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`);
    try{
        let withExtention = fs.readdirSync(storagePath);
        for(let i in withExtention){
            withExtention[i] = withExtention[i].replace('.json', '');
        }
        return new classes.Data(withExtention, `List of All Tables in Database ${preRunData[1]}`);
    } catch(e){
        if(e.code === 'ENOENT'){
            return new classes.Error('StorageError', `Database ${preRunData[1]} does not exist`);
        }
    }
}

module.exports = selectTables;