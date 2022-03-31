const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));
const readColumns = require(path.join(__dirname, 'columns.js'))

function selectTable(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`, `${code.details.name}.json`);
    if(code.details.columns === '*'){code.details.columns = 'all'}
    const table = require(storagePath);
    return findTypeAndExecute(code.details, preRunData, table)
}

function findTypeAndExecute(code, preRunData, table){
    if(code.where === false && code.order === false){
        return readValues(code, preRunData, table);
    } else if(code.where !== false && code.order === false){
        return readValuesWhere(code, preRunData, table);
    } else if(code.where === false && code.order !== false){
        return readValuesOrder(code, preRunData, table);
    } else if(code.where !== false && code.order !== false){
        return readValuesWhereOrder(code, preRunData, table);
    } 
}

function readValues(code, preRunData, table){
    //console.log('IN ONLY SELECT')
    let actualColumns = readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData).data[0];
    if(code.columns==='all'){
        code.columns=actualColumns;
    } else {
        code.columns = code.columns.replace(/\'/g, '\"')
        code.columns = JSON.parse(code.columns);
    }
    let values = table.values;
    let colVals = [];
    
    for(let x in values){
        let result = values[x].reduce(function (result, field, index) {
            result[actualColumns[index]] = field;
            return result;
        }, {})
        colVals.push(result);
    }
    const filterColumns = array => array.map(o => code.columns.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
    }, {}));
    let finalResult = filterColumns(colVals);
    return new classes.Data(finalResult, `This is the requested values from the table ${table.name}`)
}

function readValuesWhere(code, preRunData, table){
    //console.log('IN WHERE')
    let whereConditionUnparsed = code.where;
    let logicalOperator = null;
    if(whereConditionUnparsed.indexOf('||') > -1){
        logicalOperator = '||';
    } else if(whereConditionUnparsed.indexOf('&&') > -1){
        logicalOperator = '&&';
    }
    let whereConditionParsed = whereConditionUnparsed.replace('||', 'splithere').replace('&&', 'splithere').split(' splithere ');
    let whereCondition = [];
    for(let x in whereConditionParsed){
        whereCondition.push(new whereConditionObject(whereConditionParsed[x]))
    }
    let actualColumns = readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData).data[0];
    if(code.columns==='all'){
        code.columns=actualColumns;
    } else {
        code.columns = code.columns.replace(/\'/g, '\"')
        code.columns = JSON.parse(code.columns);
    }
    let values = table.values;
    let colVals = [];
    
    for(let x in values){
        let result = values[x].reduce(function (result, field, index) {
            result[actualColumns[index]] = field;
            return result;
        }, {})
        colVals.push(result);
    }
    const filterColumns = array => array.map(o => code.columns.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
    }, {}));
    let finalResult = filterColumns(colVals);

    for(let x in finalResult) {
        if(checkIfRowIsToBeRemoved(finalResult[x], whereCondition, logicalOperator)){
            finalResult[x] = null;
        }
    }
    let filtered = finalResult.filter(function (el) {
        return el != null;
    });
    return new classes.Data(filtered, `This is the requested values from the table ${table.name}`)
}

function readValuesOrder(code, preRunData, table){
    //console.log('IN ORDER')
    let order = code.order.split(' ')[0];
    let ascdesc = code.order.split(' ')[1];
    let actualColumns = readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData).data[0];
    if(code.columns==='all'){
        code.columns=actualColumns;
    } else {
        code.columns = code.columns.replace(/\'/g, '\"')
        code.columns = JSON.parse(code.columns);
    }
    let values = table.values;
    let colVals = [];
    
    for(let x in values){
        let result = values[x].reduce(function (result, field, index) {
            result[actualColumns[index]] = field;
            return result;
        }, {})
        colVals.push(result);
    }
    const filterColumns = array => array.map(o => code.columns.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
    }, {}));
    let finalResult = filterColumns(colVals);
    if(ascdesc === 'asc' || ascdesc === 'ascending'){
        eval(`finalResult = finalResult.sort((a,b)=> (a['${order}'] > b['${order}'] ? 1 : -1))`)
    } else if(ascdesc === 'descending' || ascdesc === 'desc'){
        eval(`finalResult = finalResult.sort((a,b)=> (a['${order}'] < b['${order}'] ? 1 : -1))`)
    }
    return new classes.Data(finalResult, `This is the requested values from the table ${table.name}`)
}

function readValuesWhereOrder(code, preRunData, table){
    //console.log('IN WHERE & ORDER')
    let whereConditionUnparsed = code.where;
    let logicalOperator = null;
    if(whereConditionUnparsed.indexOf('||') > -1){
        logicalOperator = '||';
    } else if(whereConditionUnparsed.indexOf('&&') > -1){
        logicalOperator = '&&';
    }
    let whereConditionParsed = whereConditionUnparsed.replace('||', 'splithere').replace('&&', 'splithere').split(' splithere ');
    let whereCondition = [];
    for(let x in whereConditionParsed){
        whereCondition.push(new whereConditionObject(whereConditionParsed[x]))
    }
    let order = code.order.split(' ')[0];
    let ascdesc = code.order.split(' ')[1];
    let actualColumns = readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData).data[0];
    if(code.columns==='all'){
        code.columns=actualColumns;
    } else {
        code.columns = code.columns.replace(/\'/g, '\"')
        code.columns = JSON.parse(code.columns);
    }
    let values = table.values;
    let colVals = [];
    
    for(let x in values){
        let result = values[x].reduce(function (result, field, index) {
            result[actualColumns[index]] = field;
            return result;
        }, {})
        colVals.push(result);
    }
    const filterColumns = array => array.map(o => code.columns.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
    }, {}));
    let finalResult = filterColumns(colVals);
    if(ascdesc === 'asc' || ascdesc === 'ascending'){
        eval(`finalResult = finalResult.sort((a,b)=> (a['${order}'] > b['${order}'] ? 1 : -1))`)
    } else if(ascdesc === 'descending' || ascdesc === 'desc'){
        eval(`finalResult = finalResult.sort((a,b)=> (a['${order}'] < b['${order}'] ? 1 : -1))`)
    }
    for(let x in finalResult) {
        if(checkIfRowIsToBeRemoved(finalResult[x], whereCondition, logicalOperator)){
            finalResult[x] = null;
        }
    }
    let filtered = finalResult.filter(function (el) {
        return el != null;
    });
    return new classes.Data(filtered, `This is the requested values from the table ${table.name}`)
}

function checkIfRowIsToBeRemoved(row, whereConditions, loperator){
    let checker = false;
    let conditions = [];
    for(let i in whereConditions){
        conditions.push(`('${row[whereConditions[i]['column']]}' ${whereConditions[i]['operater']} '${whereConditions[i]['value']}')`)
        /*eval(
            `if(!('${row[whereConditions[i]['column']]}' ${whereConditions[i]['operater']} '${whereConditions[i]['value']}')){
                checker = true;
            }`
        );
        console.log(conditions)
        if(checker){
            return true;
        }*/
    }
    if(loperator !== null){
        /*console.log(`if(!(${conditions[0]} ${loperator} ${conditions[1]})){
            checker = true;
        }`)*/
        eval(
            `if(!(${conditions[0]} ${loperator} ${conditions[1]})){
                checker = true;
            }`
        );
        if(checker){
            return true;
        }
    } else if(loperator === null){
        eval(
            `if(!${conditions[0]}){
                checker = true;
            }`
        );
        if(checker){
            return true;
        }
    }
    return false;
}

class whereConditionObject{
    constructor(part) {
        let tempvalue = (part.replace(/\'/g, '\"').match(/\w+|"[^"]+"/g))[1];
        this.column = part.split(' ')[0];
        this.operater = part.split(' ')[1];
        if(isNaN(Number(tempvalue))) {
            this.value = tempvalue.replace(/^"(.*)"$/, '$1');
        } else{
            this.value = Number(tempvalue);
        }
    }
}

module.exports = selectTable;