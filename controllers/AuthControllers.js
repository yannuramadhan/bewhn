import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req,res) => {
    const {username, password, name, email, role, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan ConfPassword tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Users.create({
            username: username,
            name: name,
            email: email,
            role: role,
            password: hashPassword
        });
        res.json({msg:"Register Success"});
    }catch(error){
        console.log(error);
    }
}

export const Login = async(req,res) => {
    try{
        const user = await Users.findAll({
            where:{
                username: req.body.username
            }
        });
        
        const match =  await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Password salah"});

        const userId = user[0].id;
        const username = user[0].username;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;

        const accessToken = jwt.sign({userId,username,name,email,role}, process.env.ACCESS_TOKEN_SECRET);

        res.json({accessToken});
    }catch{
        res.status(404).json({msg:"Username tidak ditemukan"});
    }
}

export const Logout = async(req,res) =>{
    res.status(200).json({msg:"Berhasil Logout"});
}