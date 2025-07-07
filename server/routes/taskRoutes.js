import express from "express";
import userAuth from "../middleware/userAuth.js";
import { 
    validateTaskCreation, 
    validateTaskUpdate, 
    validateTaskId 
} from "../middleware/taskValidation.js";
import { 
    taskRateLimiter, 
    taskCreationRateLimiter 
} from "../middleware/rateLimiter.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

// All task routes require authentication
taskRouter.use(userAuth);

// Apply rate limiting to all task routes
taskRouter.use(taskRateLimiter);

// Create a new task
taskRouter.post('/create', taskCreationRateLimiter, validateTaskCreation, createTask);

// Get all tasks for the authenticated user
taskRouter.get('/', getTasks);

// Update a task
taskRouter.put('/:taskid', validateTaskId, validateTaskUpdate, updateTask);

// Delete a task
taskRouter.delete('/:taskid', validateTaskId, deleteTask);

export default taskRouter;

 