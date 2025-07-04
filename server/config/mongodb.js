import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected"));
        console.log("MONGO_URI:", process.env.MONGO_URI);
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected successfully to: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

export default connectDB;




