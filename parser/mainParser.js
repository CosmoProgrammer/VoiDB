const run = require(`${__dirname}\\runner.js`)
const preRunCheck = require(`${__dirname}\\preRunChecker.js`)

function mainParser(code){
    preRunCheck();
    let result = [];
    for(let x in code){
        let message = run(code[x]);
        result.push(message);
    }
    return result;
}

module.exports = mainParser;