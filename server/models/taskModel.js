import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'study', 'other'],
        default: 'other'
    },
    createdAt: {
        type: Date,
        default: Date.now
        
    }
});

const taskModel = mongoose.model('Task', taskSchema);

export default taskModel;