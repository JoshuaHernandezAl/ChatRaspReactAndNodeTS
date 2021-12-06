import {Sequelize} from 'sequelize';

import dotenv from "dotenv";
dotenv.config();


const db=new Sequelize('ChatRaspTS',`${process.env.userDB}`,`${process.env.passwordDB}`,{
    host:'localhost',
    dialect:'mysql',
    // logging:false,
});

export default db;