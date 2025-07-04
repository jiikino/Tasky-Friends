import mongoose from 'mongoose';

// Validate task creation data
export const validateTaskCreation = (req, res, next) => {
    const { title, description, dueDate, priority, category } = req.body;
    const errors = [];

    // Title validation
    if (!title || title.trim().length === 0) {
        errors.push("Title is required");
    } else if (title.length > 100) {
        errors.push("Title must be less than 100 characters");
    }

    // Description validation
    if (!description || description.trim().length === 0) {
        errors.push("Description is required");
    } else if (description.length > 500) {
        errors.push("Description must be less than 500 characters");
    }

    // Due date validation
    if (!dueDate) {
        errors.push("Due date is required");
    } else if (new Date(dueDate) < new Date()) {
        errors.push("Due date cannot be in the past");
    }

    // Priority validation
    if (!priority) {
        errors.push("Priority is required");
    } else if (!['low', 'medium', 'high'].includes(priority)) {
        errors.push("Priority must be 'low', 'medium', or 'high'");
    }

    // Category validation
    if (!category) {
        errors.push("Category is required");
    } else if (!['work', 'personal', 'study', 'other'].includes(category)) {
        errors.push("Category must be 'work', 'personal', 'study', or 'other'");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors
        });
    }

    // Sanitize inputs
    req.body.title = title.trim();
    req.body.description = description.trim();
    req.body.category = category.trim();

    next();
};

// Validate task update data
export const validateTaskUpdate = (req, res, next) => {
    const { title, description, dueDate, priority, category } = req.body;
    const errors = [];

    // Title validation (optional for updates)
    if (title !== undefined) {
        if (title.trim().length === 0) {
            errors.push("Title cannot be empty");
        } else if (title.length > 100) {
            errors.push("Title must be less than 100 characters");
        }
    }

    // Description validation (optional for updates)
    if (description !== undefined) {
        if (description.trim().length === 0) {
            errors.push("Description cannot be empty");
        } else if (description.length > 500) {
            errors.push("Description must be less than 500 characters");
        }
    }

    // Due date validation (optional for updates)
    if (dueDate !== undefined) {
        if (new Date(dueDate) < new Date()) {
            errors.push("Due date cannot be in the past");
        }
    }

    // Priority validation (optional for updates)
    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
        errors.push("Priority must be 'low', 'medium', or 'high'");
    }

    // Category validation (optional for updates)
    if (category !== undefined && !['work', 'personal', 'study', 'other'].includes(category)) {
        errors.push("Category must be 'work', 'personal', 'study', or 'other'");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors
        });
    }

    // Sanitize inputs
    if (title !== undefined) req.body.title = title.trim();
    if (description !== undefined) req.body.description = description.trim();
    if (category !== undefined) req.body.category = category.trim();

    next();
};

// Validate MongoDB ObjectId
export const validateTaskId = (req, res, next) => {
    const { taskid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskid)) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID format"
        });
    }

    next();
}; 