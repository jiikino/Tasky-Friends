import React from 'react';
import { motion } from 'framer-motion';

const CompanionSection = ({ completedCount, totalTasks }) => {
  const progressPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 mb-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="w-20 h-20 mr-4 flex items-center justify-center"
          animate={{ 
            y: [0, -5, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <span className="text-4xl">🐱</span>
        </motion.div>
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1 font-comic">Today's Progress</div>
          <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-sm font-medium text-purple-700 mt-1 font-comic">
            {progressPercentage.toFixed(0)}% Complete!
          </div>
        </div>
      </div>
      <motion.div 
        className="mt-4 text-center text-purple-700 font-medium font-comic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        "Keep going! You're doing great today!" - Mittens ✨
      </motion.div>
    </motion.div>
  );
};

export default CompanionSection; 