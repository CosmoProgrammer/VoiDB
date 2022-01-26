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
    console.log('IN ONLY SELECT')
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
    console.log('IN WHERE')
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

function readValuesOrder(code, preRunData, table){
    console.log('IN ORDER')
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
    console.log(finalResult);
    return new classes.Data(finalResult, `This is the requested values from the table ${table.name}`)
}

function readValuesWhereOrder(code, preRunData, table){
    console.log('IN WHERE & ORDER')
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

module.exports = selectTable;