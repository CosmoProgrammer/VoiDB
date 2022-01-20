const path = require('path');
const fs = require('fs');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function actionDefault(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`, `${code.details.table}.json`);
    try{
        let table = require(storagePath);
        table.values = table.defaultvalues;
        let USING_DATABASE = preRunData[1];
        if(USING_DATABASE===''){return "KeyError: Not using any database currently"};
        fs.writeFileSync(storagePath, JSON.stringify(table, null, 4));
        if(preRunData[0]) return new classes.Success(`Successfully defaulted the table ${table.name}`);
    } catch(e){
        return new classes.Error("StorageError", `Cannot find table ${code.details.table}`);
    }
}

module.exports = actionDefault;