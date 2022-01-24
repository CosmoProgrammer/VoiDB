class Error {
    constructor(type, message){
        this.type = type;
        this.message = message;
    }
    display(){
        console.log(`${this.type}: ${this.message}`);
    }
}

class Success {
    constructor(message){
        this.message = message;
    }
    display(){
        console.log(this.message);
    }
}

class Data {
    constructor(data, info){
        this.info = info;
        this.data = data;
    }
    display(){
        console.table(this.data);
    }
}

class ActionBody {
    constructor(action, body){
        this.action = action;
        this.body = body;
    }
    display(){
        console.log(`${this.action}: ${this.body}`);
    }
}

class ActionDetails {
    constructor(action, details){
        this.action = action;
        this.details = details;
    }
    display(){
        console.log(`${this.action}: ${this.details}`);
    }
}

class BodytoDetailsResolver {
    constructor(actionbody, ActionDetails){
        this.action = actionbody.action;
        this.body = actionbody.body;
        this.ActionDetails = ActionDetails;
    }

    resolve(){
        let details = {};
        if(this.action === 'select'){
            if(this.body[0] === 'tables'){
                details.object = 'tables';
                details.name = this.body[0];
            }
            else if(this.body[0] === 'databases'){
                details.object = 'databases';
            }
            else if(this.body[0] === 'table'){
                details.object = 'table';
                details.name = this.body[1];
                details.columns = this.body[3];
                this.body.splice(0, 4);
                details.where = false;
                details.order = false;
                if(this.body.length !== 0){ 
                    if(this.body.length === 2){
                        if(this.body[0] === 'where'){
                            details.where = this.body[1];
                        } else if(this.body[0] === 'order'){
                            details.order = this.body[1];
                        }
                    } else if(this.body.length === 4){
                        if(this.body[0] === 'where'){
                            details.where = this.body[1];
                            if(this.body[2] === 'order'){
                                details.order = this.body[3];
                            }
                        } else if(this.body[0] === 'order'){
                            details.order = this.body[1];
                            if(this.body[2] === 'where'){
                                details.where = this.body[3];
                            }
                        }
                    }
                }
            }
            else if(this.body[0] === 'columns'){
                details.object = 'columns';
                details.table = this.body[1];
            }
        }
        else if(this.action === 'create'){
            if(this.body[0] === 'table'){
                details.object = 'table';
                details.name = this.body[1];
                details.columns = this.body[3];
                details.values = this.body[5];
                details.defaultvals = false;
                this.body.splice(0,6);
                if(this.body.length === 2){
                    details.defaultvals = this.body[1];
                }
            } 
            else if(this.body[0] === 'database'){
                details.object = 'database';
                details.name = this.body[1];
            }
        }
        else if(this.action === 'insert'){
            details.values = this.body[0];
            details.table = this.body[2];
            details.columns = this.body[4];
        }
        else if(this.action === 'delete'){
            if(this.body[0] === 'database'){
                details.object = 'database';
                details.database = this.body[1];
            } else if(this.body[0] === 'table'){
                details.object = 'table';
                details.table = this.body[1];
            } else if(this.body[0] === 'storage'){
                details.object = 'storage';
            }
        }
        else if(this.action === 'truncate'){
            details.table = this.body[0];
        }
        else if(this.action === 'use'){
            details.database = this.body[0];
        }
        else if(this.action === 'default'){
            details.table = this.body[0];
        };
        for(let x in details){
            if(typeof details[x] !== 'boolean'){
                details[x] = details[x].replace(/(^"|"$)/g, '')
            }
        }
        return new ActionDetails(this.action, details);
    }

    display(){
        console.log('vvvvvvvv')
        console.log(this.action);
        console.table(this.body)
        console.log('^^^^^^^^')
    }
}

module.exports = {
    Error: Error,
    Success: Success,
    ActionBody: ActionBody,
    BodytoDetailsResolver: BodytoDetailsResolver,
    ActionDetails: ActionDetails,
    Data: Data
}