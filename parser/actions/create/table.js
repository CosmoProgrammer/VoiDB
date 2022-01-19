const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));

class hashPassword{constructor(index){this.index = index;}}



function valueChecker(columns, values){
    let exceptionTypes = ['password'];
    let needToHash = false;
    let index;
    if(columns.length !== values.length){
        return new classes.Error('TypeError', `Number of values: ${values.length} must be equal to number of columns: ${columns.length}`);
    }
    for(let x in values) {
        let expectedType = (Object.values(columns[x])[0].split(' '))[0];
        let actualType = typeof values[x];
        if(!(exceptionTypes.includes(expectedType))){
            if(!(expectedType === actualType)){
                return new classes.Error('TypeError', `Values don't match with Types. Type of ${values[x]} is ${actualType} and not ${expectedType}`);
            };
        } else{
            if(expectedType === 'password'){
                needToHash = true;
                index = x;
                if(actualType !== 'string'){
                    return new classes.Error('TypeError', `Password has to be a sting. Type of ${values[x]} is ${actualType} and not String`)
                }
            }
        }
    }
    if(needToHash) return new hashPassword(index);
}

function defaultvalueChecker(columns, values){
    let exceptionTypes = ['password'];
    let needToHash = false;
    let index;
    if(columns.length !== values.length){
        return new classes.Error('TypeError', `Number of values: ${values.length} must be equal to number of columns: ${columns.length}`);
    }
    for(let x in values) {
        let expectedType = (Object.values(columns[x])[0].split(' '))[0];
        let actualType = typeof values[x];
        if(!(exceptionTypes.includes(expectedType))){
            if(!(expectedType === actualType)){
                return [false, new classes.Error('TypeError', `Default Values don't match with Types. Type of ${values[x]} is ${actualType} and not ${expectedType}`)];
            };
        } else{
            if(expectedType === 'password'){
                needToHash = true;
                index = x;
                if(actualType !== 'string'){
                    return new classes.Error('TypeError', `Password has to be a sting. Type of ${values[x]} is ${actualType} and not String`)
                }
            }
        }
    }
    if(needToHash) return new hashPassword(index);
}

function createTable(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage');
    let table = {
        name: code.details.name
    }
    let vals = JSON.parse(code.details.values.replace(/'/g, '\"'));
    let cols = JSON.parse(code.details.columns.replace(/'/g, '\"'));
    table['columns'] = cols;
    for(let y in vals){
        let tempCheckerResult = valueChecker(cols, vals[y])
        if(tempCheckerResult instanceof classes.Error){
            return tempCheckerResult;
        } else if(tempCheckerResult instanceof hashPassword){
            let hash = bcrypt.hashSync(vals[y][tempCheckerResult['index']], 10 );
            vals[y][tempCheckerResult['index']] = hash;
        }
        //console.log(`checked ${vals[y]}`)
    }
    table['values'] = vals;
    let dvals = JSON.parse(code.details.defaultvals.replace(/'/g, '\"'));
    for(let y in dvals){
        let tempCheckerResult = defaultvalueChecker(cols, dvals[y])
        if(tempCheckerResult instanceof classes.Error){
            return tempCheckerResult;
        }else if(tempCheckerResult instanceof hashPassword){
            let hash = bcrypt.hashSync(dvals[y][tempCheckerResult['index']], 10 );
            dvals[y][tempCheckerResult['index']] = hash;
        }
        //console.log(`checked default value ${dvals[y]}`)
    }
    table['defaultvalues'] = dvals;
    let USING_DATABASE = preRunData[1];
    if(USING_DATABASE===''){return "KeyError: Not using any database currently"};
    if(fs.existsSync(`${storagePath}\\${USING_DATABASE}\\${table.name}.json`)){
        return new classes.Error("StorageError", "A table with that name already exists");
    } else {
        fs.writeFileSync(`${storagePath}\\${USING_DATABASE}\\${table.name}.json`, JSON.stringify(table, null, 2));
        if(preRunData[0]) return new classes.Success("Created a table with name successfully")
    }
}

module.exports = createTable;