const objects = {
    databases: require(`${__dirname}\\databases.js`),
    tables: require(`${__dirname}\\tables.js`),
    columns: require(`${__dirname}\\columns.js`),
    table: require(`${__dirname}\\table.js`)
}

function actionCreate(code, preRunData){
    if(code.details.object === 'databases'){
        return objects.databases(code, preRunData);
    } else if(code.details.object === 'tables'){
        return objects.tables(code, preRunData);
    } else if(code.details.object === 'columns'){
        return objects.columns(code, preRunData);
    } else if(code.details.object === 'table'){
        return objects.table(code, preRunData);
    }
    return code;
}

module.exports = actionCreate;