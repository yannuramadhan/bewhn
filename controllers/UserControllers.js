import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import db from "../config/connection.js";

// GET all users
export const getUsers = async(req,res) => {
    try {
        const queryResult = await db.query('SELECT * FROM users ORDER BY id ASC');
        res.json(queryResult[0]);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// GET users by ID
export const getUserById = async (req, res) => {
    const userId = req.params.id; // Retrieve the user ID from the request parameters

    try {
        const user = await Users.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            // If the user with the specified ID is not found, return a 404 status code
            return res.status(404).json({ msg: "User not found" });
        }

        // If the user is found, return the user data as JSON
        res.json(user);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// POST create new users
export const createUser = async(req,res) => {
    const {username, password, name, email, role, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Create User Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// PUT update users
export const updateUser = async(req,res) => {
  const user = await Users.findOne({
    where: {
        id: req.params.id
    }
  });
    const {username, password, name, email, role, confPassword} = req.body;
    console.log(username,password,name,email, role, confPassword);
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    try {
        await Users.update({
            username: username,
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(201).json({msg: "Update User Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// DELETE users
export const deleteUser = async(req,res) => {
  const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Delete User Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
