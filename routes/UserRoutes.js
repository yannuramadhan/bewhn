import express from "express";
import { 
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser } from "../controllers/UserControllers.js";
import { verifyToken, adminOnly } from "../middleware/Auth.js";

const router =  express.Router();

router.get('/users', verifyToken, adminOnly, getUsers);
router.get('/users/:id', verifyToken, adminOnly, getUserById);
router.post('/users', verifyToken, adminOnly, createUser);
router.put('/users/:id', verifyToken, adminOnly, updateUser);
router.delete('/users/:id', verifyToken, adminOnly, deleteUser);

export default router;