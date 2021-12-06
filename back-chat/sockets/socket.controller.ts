import { Socket } from "socket.io";
import { validateJWT } from '../middlewares/validate-jwt';
import ChatMessages from "../models/Chat";
import shortid from 'shortid';

const chatMessages= new ChatMessages();

export const socketController=async (socket:Socket,io:any)=>{
    const {xtoken,username}=socket.handshake.headers;
    const user=await validateJWT(String(xtoken),socket.id);
    if(user==socket.id){
        eventsGuest(io,String(username),socket);
    }else if(!user){
        return socket.disconnect();
    }else{
        eventsUserIdentified(io,user,socket);
    }
}
const eventsGuest = (io:any,username:string,socket:Socket)=>{
    chatMessages.connectUser(username+(shortid.generate()));
    io.emit('active-users',chatMessages.usersArr);
    socket.emit('receive-msgs',chatMessages.last10);
    socket.on('disconnect',()=>{
        chatMessages.desconnectUser(username);
        io.emit('active-users',chatMessages.usersArr);
    });
    socket.on('send-msg',({txtMessage:msg}:any)=>{
        chatMessages.sendMessage(username,msg);
        io.emit('receive-msgs',chatMessages.last10);
        console.log('rojo');
    })
}
const eventsUserIdentified = (io:any,user:string,socket:Socket)=>{
    chatMessages.connectUser(user);
    io.emit('active-users',chatMessages.usersArr);
    socket.emit('receive-msgs',chatMessages.last10);
    socket.on('disconnect',()=>{
        chatMessages.desconnectUser(user);
        io.emit('active-users',chatMessages.usersArr);
    });
    socket.on('send-msg',({txtMessage:msg}:any)=>{
        chatMessages.sendMessage(user,msg);
        io.emit('receive-msgs',chatMessages.last10);
        console.log('azul');
    })
}