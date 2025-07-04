import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from '../config/nodemailer.js';
import userModel from "../models/userModel.js";

/*
1.	📥 Gets the user’s data from the request
2.	✅ Checks that all fields are filled in
3.	🔍 Checks if the user already exists in your MongoDB
4.	🔒 Hashes the password so it’s safe
5.	💾 Saves the new user in MongoDB
6.	🪪 Creates a JWT token
7.	🍪 Sends that token back as a cookie
8.	💥 Handles any errors
*/

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: "All fields are required"}); // if any field is missing, return false and message
    }
    try {
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.json({success: false, message: "User already exists"});
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'Production',
            sameSite: process.env.NODE_ENV !== 'Production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Tasky Friends 🐼',
            text: `Hello ${name}, \n\n Welcome to Tasky Friends 🐼. We're excited for you to begin your journey with us! \n\n Please use the following link to verify your email: ${email} \n The Tasky Friends Team 🐼 `,

                 }
         
         try {
             await transporter.sendMail(mailOptions);
             console.log("Welcome email sent successfully!");
         } catch (emailError) {
             console.error("Failed to send welcome email:", emailError.message);
             // Continue with registration even if email fails
         }
         
         return res.json({success: true, message: "User registered successfully"});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

/*
1.	📥 Gets the user’s data from the request
2.	✅ Checks that all fields are filled in
3.	🔍 Checks if the user already exists in your MongoDB
4.	🔒 Hashes the password so it’s safe
5.	💾 Saves the new user in MongoDB
6.	🪪 Creates a JWT token
7.	🍪 Sends that token back as a cookie
8.	💥 Handles any errors
*/
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: "All fields are required"});
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success:false, message: 'Invalid password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'Production',
            sameSite: process.env.NODE_ENV !== 'Production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({success: true, message: "User logged in successfully"});
    

     } catch (error) {
        res.json({success: false, message: error.message});
     
        
    }
}

/*
1.	📥 Gets the user’s data from the request
2.	✅ Checks that all fields are filled in
3.	🔍 Checks if the user already exists in your MongoDB
4.	🔒 Hashes the password so it’s safe
5.	💾 Saves the new user in MongoDB
6.	🪪 Creates a JWT token
7.	🍪 Sends that token back as a cookie
8.	💥 Handles any errors
*/
export const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'Production',
            sameSite: process.env.NODE_ENV !== 'Production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({success: true, message: "User logged out successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// send verification otp to user's email
export const sendVerificationOtp = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified) {
            return res.json({success: false, message: "Account already verified"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verificationOtp = otp;
        user.verificationOtpExpiresAt = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Tasky Friends 🐼 - Verify Your Email',
            text: `Hello ${user.name}, \n\n Your verification OTP is: ${otp} \n\n Please use this OTP to verify your email. \n\n The Tasky Friends Team 🐼 `,
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log("Verification OTP email sent successfully!");
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError.message);
            // Continue even if email fails
        }

        return res.json({success: true, message: "Verification OTP sent successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// verify email
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.json({success: false, message: "All fields are required"});
    }

    try {
        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({ success: false, message: "User not found"});
        }

        if(user.verificationOtp !== otp || user.verificationOtp === '') {
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.verificationOtpExpiresAt < Date.now()) {
            return res.json({success: false, message: "OTP has expired"});
        }

        user.isAccountVerified = true; // set the user's account to verified
        user.verificationOtp = ''; // set the user's verification otp to an empty string to avoid re-use (resets the otp)
        user.verificationOtpExpiresAt = 0; // set the user's verification otp expires at to 0 to avoid re-use (resets the otp)
        await user.save(); // save the user to the database

        return res.json({success: true, message: "Email verified successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const isAuthenticated = async (req, res) => {

    try {

        return res.json({success: true, message: "User is authenticated"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const sendResetPasswordOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.json({success: false, message: "Email is required"});
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User not found"}); 
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiresAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Tasky Friends 🐼 - Reset Your Password',
            text: `Hello ${user.name}, \n\n Your reset password OTP is: ${otp} \n\n Please use this OTP to reset your password. \n\n The Tasky Friends Team 🐼 `,
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Reset password OTP sent successfully"});
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// reset password
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({success: false, message: "All fields are required"});
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User not found"});
        }

        if(user.resetPasswordOtp !== otp || user.resetPasswordOtp === '') {
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.resetPasswordOtpExpiresAt < Date.now()) {
            return res.json({success: false, message: "OTP has expired"});
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user password and clear reset OTP
        user.password = hashedPassword;
        user.resetPasswordOtp = '';
        user.resetPasswordOtpExpiresAt = 0;
        await user.save();

        return res.json({success: true, message: "Password reset successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
