import { useRef, useState } from "react";
import { io } from "socket.io-client";
import { keyupEnter, socketEvents } from "../events/socket.events";
import { useForm } from '../hooks/useForm';


export const ChatScreen = () => {
    const txtmensaje=useRef();
    const ulUsuarios=useRef();
    const ulMensajes=useRef();

    const [onOff, setOnOff] = useState(true);
    const [startChatting,handleStartChatting]=useForm({
        username:'testUser',
    });
    const socket=useRef();
    const handleGuest=(e)=>{
        e.preventDefault();
        localStorage.setItem('username',startChatting.username);
        window.location.reload();
    }
    const handleChat=(e)=>{
        e.preventDefault();
        setOnOff(false);
        const referencesHTML={
            txtmensaje:txtmensaje.current,
            ulUsuarios:ulUsuarios.current,
            ulMensajes:ulMensajes.current,
        };
        socket.current = io("localhost:4000",{
            'extraHeaders':{
                xtoken:localStorage.getItem('token')||"no-token",
                username:localStorage.getItem('username'),
            }
        });
        socketEvents(socket.current,referencesHTML);
    }
    const handleEnter=({keyCode})=>{
        if(keyCode !==13){ return;}
        const txtMsg=txtmensaje.current;
        if(txtMsg.value.length===0){return;}
        keyupEnter(txtMsg.value,socket.current);
    }
    const handleDisconnect = ()=>{
        socket.current.disconnect();
    }
    

    const username = localStorage.getItem('username');
    return (
        <>
            <div className="container row">
                {!username?
                <div className="col-4 border border-primary mx-5 bg-user">
                    <form className="d-flex justify-content-start mt-5" onSubmit={handleGuest}>
                        <label className="form-label">UserName</label>
                        <input type="text" className="ms-3" placeholder="username" name="username" onChange={handleStartChatting}/> 
                    </form>
                    <span >Presiona enter para comenzar a chatear</span>
                </div>
                :<div className="col-4 border border-primary mx-5 bg-user">
                    <h3>{username}</h3>
                    <button className={`btn ${onOff?'btn-success':'btn-danger'}`} onClick={onOff?handleChat:handleDisconnect}>{onOff?'Chat':'Desconectar'}</button>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <h3>Enviar mensaje</h3>
                            <hr/>
                            <input type="text" id="txtmensaje" ref={txtmensaje}  onKeyUp={handleEnter} className="form-control mb-2" placeholder="Mensaje" autoComplete="off" autoFocus disabled={onOff?true:false}/>
                            <h3>Usuarios Activos:</h3>
                            <hr/>
                            <ul id="ulUsuarios" ref={ulUsuarios}>
                                
                            </ul>
                        </div>
                    </div>
                </div>}
                <div className="col border border-info bg-msg row">
                    <div className="col-sm-12">
                        <h3>Chat completo</h3>
                        <hr/>
                        <ul id="ulMensajes" ref={ulMensajes}>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
