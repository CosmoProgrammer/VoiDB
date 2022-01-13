const path = require('path');
const classes = require(path.join(__dirname, '../', 'classes.js'));

function ActionDetailsClassesCreator(code){
    for(let x in code){
        let y = new classes.BodytoDetailsResolver(code[x], classes.ActionDetails);
        y.display();
        console.table(y.resolve());
    }
    return code;
}

module.exports = ActionDetailsClassesCreator;