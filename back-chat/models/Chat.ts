class Message{
    private message:string;
    private username:string;
    constructor(username:string,message:string){
        this.username = username;
        this.message= message;
    }
}
type UserType=|{username:string}|{}|any
class ChatMessages{
    private msgs: Message[];
    private users:UserType;
    constructor(){
        this.msgs =[];
        this.users={};
    }
    get last10(){
        this.msgs=this.msgs.splice(0,10);
        return this.msgs;
    }
    get usersArr(){
        return Object.values(this.users);
    }
    sendMessage(username:string,message:string){
        this.msgs.unshift(
            new Message(username,message),
        );
    }
    connectUser(username:string){
        this.users[username]=username;
    }
    desconnectUser(username:string){
        delete this.users[username];
    }
}
export default ChatMessages;