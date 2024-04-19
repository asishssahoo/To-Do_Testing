export class ErrorHandler{
    sqlState : number;
    sqlMessage : string;

    constructor(sqlState: number, sqlMessage : string){
        this.sqlState = sqlState;
        this.sqlMessage = sqlMessage;
    }
    
    getSqlMessage() : string {
        if(this.sqlState == 23000){
            return "Duplicate entry found.."
        }
        return this.sqlMessage;
    }
}