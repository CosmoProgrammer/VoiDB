const path = require('path');
const classes = require(path.join(__dirname, '../', 'classes.js'));

function ActionDetailsClassesCreator(code){
    let arrayCode = [];
    for(let x in code){
        let y = new classes.BodytoDetailsResolver(code[x], classes.ActionDetails);
        arrayCode.push(y.resolve());
    }
    return arrayCode;
}

module.exports = ActionDetailsClassesCreator;