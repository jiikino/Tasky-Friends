import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, AlertCircle, Star, Clock } from 'lucide-react';

const TaskList = ({ tasks, onToggle }) => {
  const priorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-rose-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };
  
  const categoryColor = (category) => {
    switch(category) {
      case 'Work': return 'bg-blue-100 text-blue-800';
      case 'Personal': return 'bg-purple-100 text-purple-800';
      case 'Health': return 'bg-green-100 text-green-800';
      case 'Home': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      className="flex-1 overflow-y-auto mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <motion.div 
              key={task.id} 
              className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-300 ${task.completed ? 'opacity-70' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(147, 51, 234, 0.1)" }}
            >
              <div className="flex items-center">
                <motion.button 
                  onClick={() => onToggle(task.id)}
                  className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-all duration-200 ${task.completed ? 'bg-purple-500 text-white' : 'border-2 border-purple-300'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </motion.button>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-medium font-comic ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </span>
                    <span className={`ml-2 ${priorityColor(task.priority)}`}>
                      {task.priority === 'high' && <AlertCircle size={14} />}
                      {task.priority === 'medium' && <Clock size={14} />}
                      {task.priority === 'low' && <Star size={14} />}
                    </span>
                  </div>
                  <div className="flex mt-2 items-center text-xs">
                    <span className={`px-2 py-1 rounded-full font-comic ${categoryColor(task.category)}`}>
                      {task.category}
                    </span>
                    <span className="ml-2 text-gray-500 flex items-center font-comic">
                      <Calendar size={12} className="mr-1" /> Today
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ 
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              🌸
            </motion.div>
            <p className="font-comic text-lg">You don't have any tasks yet!</p>
            <motion.p 
              className="font-comic text-sm mt-2 text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Time to add your first task and get started! ✨
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
