function wordCuller(code){
    //List of all Words to be removed from the code
    const remove = ['a', 'called', 'with', 'the', 'some', 'and', 'by', 'in', 'from', 'new'];

    //Splits by ; 
    let c_sentences = code.split(';');
    let c=[];

    //Splits the code into words but also makes sure everything inside "" is not split apart.
    for(var x in c_sentences){c.push(c_sentences[x].match(/\w+|"[^"]+"/g))};

    //If the last word in the split code is empty, then the blank word is removed from the split code.
    try{ if(c[x].length === 0){console.log("Last element in c is not empty");}} catch(e){let popped = c.pop();};

    //Removes all the words in the remove constant
    for(var x=0; x<c.length; x++){
        for(var y=0; y<c[x].length; y++){
            if(remove.includes(c[x][y])){ 
                c[x].splice(y,1);
                y--;
            }
        }
    }
     
    return c;
}

module.exports = wordCuller;