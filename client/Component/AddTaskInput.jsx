import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react'; 

const AddTaskInput = ({ newTask, setNewTask, onAddTask }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <motion.div 
      className="mt-auto mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div 
        className="bg-white rounded-xl p-3 shadow-md flex items-center"
        whileHover={{ scale: 1.01 }}
      >
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border-0 focus:ring-0 text-gray-700 placeholder-gray-400 text-sm font-comic"
          onKeyPress={handleKeyPress}
        />
        <motion.button 
          onClick={onAddTask}
          className="ml-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AddTaskInput; 