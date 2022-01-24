const fs = require('fs');
const path = require('path');
const classes = require(path.join(__dirname, '../../../', 'classes.js'));
const readColumns = require(path.join(__dirname, 'columns.js'))

function selectTable(code, preRunData){
    let storagePath = path.join(__dirname, '../../../', 'storage', `${preRunData[1]}`, `${code.details.name}.json`);
    if(code.details.columns === '*'){code.details.columns = 'all'}
    console.log(code.details);
    const table = require(storagePath);
    findTypeAndExecute(code.details, preRunData, table)
}

function findTypeAndExecute(code, preRunData, table){
    if(code.where === false && code.order === false){
        readValues(code, preRunData, table);
    } else if(code.where !== false && code.order === false){
        readValuesWhere(code, preRunData, table);
    } else if(code.where === false && code.order !== false){
        readValuesOrder(code, preRunData, table);
    } else if(code.where !== false && code.order !== false){
        readValuesWhereOrder(code, preRunData, table);
    } 
}

function readValues(code, preRunData, table){
    console.log('IN ONLY SELECT')
    if(code.columns==='all'){
        code.columns=readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData);
        code.columns=code.columns.data[0];
    }
    let values = table.values;
    console.log(values);
    console.log(code.columns)
}

function readValuesWhere(code, preRunData, table){
    console.log('IN WHERE')
    if(code.columns==='all'){
        code.columns=readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData);
        code.columns=code.columns.data[0];
    }
    let values = table.values;
}

function readValuesOrder(code, preRunData, table){
    console.log('IN ORDER')
    if(code.columns==='all'){
        code.columns=readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData);
        code.columns=code.columns.data[0];
    }
    let values = table.values;
}

function readValuesWhereOrder(code, preRunData, table){
    console.log('IN WHERE & ORDER')
    if(code.columns==='all'){
        code.columns=readColumns(new classes.ActionDetails('select', {object: 'columns', table: code.name}), preRunData);
        code.columns=code.columns.data[0];
    }
    let values = table.values;
}

module.exports = selectTable;