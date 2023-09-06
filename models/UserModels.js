import { Sequelize } from "sequelize";
import db from "../config/connection.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName:true
});

export default Users;