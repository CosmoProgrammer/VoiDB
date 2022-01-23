const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

function selectColumns(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`, `${code.details.table}.json`);
    try {
        const table = require(storagePath);
        const columns = table.columns;
        let columnArray = [];
        for(let i in columns){
            columnArray.push(Object.keys(columns[i]))
        }
        let finalArray = [].concat.apply([], columnArray);
        return new classes.Data([finalArray, columns], `List of All Columns in Table ${code.details.table} in Database ${preRunData[1]}`);
    } catch (e){
        if (e.code === 'ENOENT'){
            return new classes.Error('StorageError', `Table ${code.details.table} cannot be found in database ${preRunData[1]}.`);
        }
    }
}

module.exports = selectColumns;