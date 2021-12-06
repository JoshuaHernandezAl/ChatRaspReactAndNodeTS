import { io } from "socket.io-client";
import { useForm } from '../hooks/useForm';


export const ChatScreen = () => {
    const [startChatting,handleStartChatting]=useForm({
        username:'testUser',
    });
    let socket;
    const handleGuest=(e)=>{
        e.preventDefault();
        localStorage.setItem('username',startChatting.username);
    }
    const handleChat=(e)=>{
        e.preventDefault();
        socket = io("localhost:4000");
        socket.on("connect", () => {
            console.log(socket.id); 
        });
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
                    <button className="btn btn-success" onClick={handleChat}>Comenzar el chat</button>
                </div>}
                <div className="col border border-info bg-msg">
                    Mensajes
                </div>
            </div>
        </>
    )
}
