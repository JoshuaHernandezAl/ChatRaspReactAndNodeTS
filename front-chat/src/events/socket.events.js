export const socketEvents = (socket,referencesHTML)=> {
    socket.on("connect", () => {
        console.log('Conexion de:',localStorage.getItem('username')); 
    });
    socket.on("disconnect", () => {
        console.log('desconexion de: ',localStorage.getItem('username'));
        localStorage.clear();
        window.location.reload();
    });
    socket.on("receive-msgs", (payload)=>{
        printMessages(payload,referencesHTML.ulMensajes);
    })
    socket.on("active-users",(payload)=>{
        addUserHTML(payload,referencesHTML.ulUsuarios);
    })

}
export const keyupEnter = (txtMessage,socket) => {
        socket.emit("send-msg",{txtMessage});
}
const addUserHTML=(users,ulUsuarios) => {
    let usersHTML = '';
    users.forEach(user => {
        usersHTML+=`
            <li>
                <p>
                    <h5 class="text-success fw-bold fs-4">${user}</h5>
                </p>
            </li>
        `;
    });
    ulUsuarios.innerHTML= usersHTML;
}
const printMessages=(msgs,ulMensajes) => {
    let msgsHTML = '';
    msgs.forEach(({username,message}) => {
        msgsHTML+=`
            <li>
                <p>
                    <span class="text-primary fw-bold fs-5">${username}: </span>
                    <span>${message}</span>
                </p>
            </li>
        `;
    });
    ulMensajes.innerHTML= msgsHTML;
}
