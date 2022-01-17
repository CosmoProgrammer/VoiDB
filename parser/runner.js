const actions = {
    create: require(`${__dirname}\\actions\\create\\create.js`)
}

function run(code, preRunData){
    if(code.action==="create"){
        return actions.create(code, preRunData)
    }
    return code.action;
}

module.exports = run;