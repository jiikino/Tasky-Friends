import express from "express";
import { registerUser, login, logout, sendVerificationOtp, verifyEmail, isAuthenticated, sendResetPasswordOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";



const authRouter = express.Router();


authRouter.post('/register', registerUser);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verification-otp', userAuth, sendVerificationOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.get('/is-authenticated', userAuth, isAuthenticated);
authRouter.post('/send-reset-password-otp', sendResetPasswordOtp);
authRouter.post('/reset-password', resetPassword);



export default authRouter;