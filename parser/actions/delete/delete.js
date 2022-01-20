const objects = {
    storage: require(`${__dirname}\\storage.js`),
    database: require(`${__dirname}\\database.js`),
    table: require(`${__dirname}\\table.js`)
}

function actionDelete(code, preRunData){
    if(code.details.object === 'database'){
        return objects.database(code, preRunData);
    } else if(code.details.object === 'table'){
        return objects.table(code, preRunData);
    } else if(code.details.object === 'storage'){
        return objects.storage(code, preRunData);
    }
    return code;
}

module.exports = actionDelete;