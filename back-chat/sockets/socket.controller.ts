import { Socket } from "socket.io";

export const socketController=(socket:Socket)=>{
    console.log('cliente conectado', socket.id);
}