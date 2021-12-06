import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import db from "../db/connection";

// We recommend you declare an interface for the attributes, for stricter typechecking
interface UserAttributes {
    username:string;
    password:string;
    state:boolean,
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, "state"> {}

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance
extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User=db.define<UserInstance>("User",{
    username:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING(60),
    },
    state:{
        type:DataTypes.BOOLEAN,
    },
});

export default User;