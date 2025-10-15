import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ completedCount, totalTasks, onLogout }) => {
  return (
    <motion.header 
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4"
          animate={{ 
            rotate: [0, 5, -5, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <span className="text-xl">🐱</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-purple-800 font-bubblegum">TaskyFriends</h1>
      </motion.div>
      <div className="flex items-center space-x-3">
        <motion.div 
          className="bg-white rounded-full px-4 py-2 shadow-md text-sm font-medium text-purple-600"
          whileHover={{ scale: 1.05 }}
        >
          {completedCount} of {totalTasks} tasks complete
        </motion.div>
        <motion.button
          onClick={onLogout}
          className="bg-white bg-opacity-70 text-purple-700 px-3 py-1 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-200 font-comic text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          👋 Logout
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header; 