import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationOtp: { type: String, default: '' },
    verificationOtpExpiresAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetPasswordOtp: { type: String, default: '' },
    resetPasswordOtpExpiresAt: { type: Number, default: 0 },
    pet: { type: String, default: '' },


    
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;