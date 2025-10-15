import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData , choosePet } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.post('/choose-pet', userAuth, choosePet);

export default userRouter;