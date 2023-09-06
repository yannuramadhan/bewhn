import { Sequelize } from "sequelize";
import db from "../config/connection.js";

const { DataTypes } = Sequelize;

const Articles = db.define('articles',{
    judul:{
        type: DataTypes.STRING
    },
    deskripsi:{
        type: DataTypes.TEXT
    },
    foto:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

export default Articles;