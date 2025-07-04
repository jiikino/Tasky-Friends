import taskModel from "../models/taskModel.js";

// create task so my frontend can create my tasks
export const createTask = async (req, res) => {
    try {
        const {title, description, dueDate, priority, category} = req.body;

        const task = await taskModel.create({
            userId: req.userId,  // comes from userAuth middleware
            title,
            description,
            dueDate,
            priority,
            category
        });

        return res.json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
// get all task so my frontend can see my tasks and list them
export const getTasks = async (req, res) => {
    try {
        // Find all tasks that belong to this user, sorted newest first
        const tasks = await taskModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    
        res.json({
          success: true,
          tasks
        });
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    
}

// update task so my frontend can update my tasks
export const updateTask = async (req, res) => {
    const {taskid} = req.params; // this is the :id from your URL
    const {title, description, dueDate, priority, category} = req.body;

    try {
        // Find the task that belongs to this user & has this ID
        const task = await taskModel.findOne({ _id: taskid, userId: req.userId });
    
        if (!task) {
          return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Update the task with the new data
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.category = category || task.category;

        await task.save();

        return res.json({success: true, message: "Task updated successfully", task});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// delete task so my frontend can delete my tasks
export const deleteTask = async (req, res) => {
    const {taskid} = req.params; // this is the :id from your URL
    try {
        // Make sure the task exists and belongs to this logged-in user
        const task = await taskModel.findOne({ _id: taskid, userId: req.userId });
        if (!task) {
          return res.status(404).json({
            success: false,
            message: "Task not found or you do not have permission to delete this task"
          });
        }
    
        // Actually delete the task
        await task.deleteOne();
    
        // Respond with success
        return res.json({
          success: true,
          message: "Task deleted successfully"
        });
    
      } catch (error) {
        // Handle any unexpected errors (like invalid ID format)
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
}



    



