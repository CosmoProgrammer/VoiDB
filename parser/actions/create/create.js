const objects = {
    database: require(`${__dirname}\\database.js`),
    table: require(`${__dirname}\\table.js`)
}

function actionCreate(code, preRunData){
    if(code.details.object === 'database'){
        return objects.database(code, preRunData);
    } else if(code.details.object === 'table'){
        return objects.table(code, preRunData);
    }
    return code;
}

module.exports = actionCreate;