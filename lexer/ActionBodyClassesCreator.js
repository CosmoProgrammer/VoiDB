const path = require('path');
const classes = require(path.join(__dirname, '../', 'classes.js'));

function ActionBodyClassesCreator(code){
    //List of all the action words that can be used
    const mainActions = ['create', 'select', 'insert', 'delete', 'use', 'truncate', 'default', 'validate'];
    let ActionBodyClasses = [];

    //Replaces all alternative action words with the main action words
    for(let x in code){
        if(code[x][0] === 'make'){ code[x][0] = 'create'}
        else if(code[x][0] === 'read' || code[x][0] === 'return'){ code[x][0] = 'select'}
        else if(code[x][0] === 'add'){ code[x][0] = 'insert'}
        else if(code[x][0] === 'remove'){ code[x][0] = 'delete'};
    }

    //Creating a new array and pushing all the commands into it in the form of ActionBody Objects
    for(let x in code){
        let action = code[x][0];
        let body = code[x].slice(1);
        ActionBodyClasses.push(new classes.ActionBody(action, body));
    }

    return ActionBodyClasses;
}

module.exports = ActionBodyClassesCreator;