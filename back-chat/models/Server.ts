import express, {Application} from "express";
import userRouter from "../routes/user.routes";
import cors from "cors";
import db from "../db/connection";
import { socketController } from "../sockets/socket.controller";

class Server{
    private app: Application;
    private port:string;
    private paths={
        users:"/api/users",
    }

    //socket
    private server;
    private io;

    constructor(){
        this.app = express();
        this.port=process.env.PORT||'4000';

        //socket config
        this.server = require('http').createServer(this.app);
        this.io=require('socket.io')(this.server,{
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        
        this.dbConnect();
        this.middlewares();
        this.routes();
        
        //socket events
        this.sockets();

    }

    routes(){
        this.app.use(this.paths.users,userRouter);
    }
    async dbConnect(){
        try{
            await db.authenticate();
            console.log("db connected");
        }catch(err:any){
            throw new Error(err);
            
            
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura body
        this.app.use(express.json());
        //CarpetaPublica
        this.app.use(express.static('public'));
    }

    sockets(){
        this.io.on('connection',socketController);
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log('Server on port '+ this.port);
        });
    }
}
export default Server;