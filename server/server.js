import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';


// Load environment variables
dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));


// API Routes
app.get('/', (req, res) => {
  res.send("Task Manager server is working");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tasks', taskRouter);

// Global error handler (must be last)
app.use(errorHandler);

// Port configuration
const PORT = process.env.PORT || 4000;
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 