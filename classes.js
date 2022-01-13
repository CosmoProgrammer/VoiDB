class Error {
    constructor(type, message){
        this.type = type;
        this.message = message;
    }
    display(){
        console.log(`${this.type}: ${this.message}`);
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
                details.name = this.body[1];
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
                details.table = this.body[2];
            }
        }
        else if(this.action === 'create'){}
        else if(this.action === 'insert'){}
        else if(this.action === 'delete'){}
        else if(this.action === 'truncate'){}
        else if(this.action === 'use'){}
        else if(this.action === 'default'){};
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
    ActionBody: ActionBody,
    BodytoDetailsResolver: BodytoDetailsResolver,
    ActionDetails: ActionDetails
}