const path = require('path');

const mainLexer = require(path.join(__dirname, 'lexer', 'mainLexer.js'));
const mainParser = require(path.join(__dirname, 'parser', 'mainParser.js'));

function voidb(code) {
    let lexedCode = mainLexer(code);
    let parsedCode = mainParser(lexedCode);
    return parsedCode;
};

module.exports = voidb;