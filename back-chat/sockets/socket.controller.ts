import { Socket } from "socket.io";
import { validateJWT } from '../middlewares/validate-jwt';
import ChatMessages from "../models/Chat";
import shortid from 'shortid';
import axios from "axios";
const chatMessages= new ChatMessages();

export const socketController=async (socket:Socket,io:any)=>{
    const {xtoken,username}=socket.handshake.headers;
    const user=await validateJWT(String(xtoken),socket.id);
    await axios({
        method: 'POST',
        url:process.env.iotServerUrl+'/lcd-display-connection',
        data:{
            username,
        }
    });
    if(user==socket.id){
        eventsGuest(io,String(username),socket);
    }else if(!user){
        return socket.disconnect();
    }else{
        eventsUserIdentified(io,user,socket);
    }
}
const eventsGuest = (io:any,username:string,socket:Socket)=>{
    const usernameSocket=username+(shortid.generate());
    chatMessages.connectUser(usernameSocket);
    io.emit('active-users',chatMessages.usersArr);
    socket.emit('receive-msgs',chatMessages.last10);
    socket.on('disconnect',()=>{
        chatMessages.desconnectUser(usernameSocket);
        io.emit('active-users',chatMessages.usersArr);
    });
    socket.on('send-msg',({txtMessage:msg}:any)=>{
        chatMessages.sendMessage(usernameSocket,msg);
        io.emit('receive-msgs',chatMessages.last10);
        axios({
            method: 'POST',
            url:process.env.iotServerUrl+'/lcd-display-msg',
            data:{
                username:usernameSocket,
                userType:'guest'
            }
        });
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
        axios({
            method: 'POST',
            url:process.env.iotServerUrl+'/lcd-display-msg',
            data:{
                username:user,
                userType:'auth'
            }
        });
    })
}