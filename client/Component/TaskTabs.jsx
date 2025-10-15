import React from 'react';
import { motion } from 'framer-motion';

const TaskTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'all', label: 'All Tasks' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <motion.div 
      className="flex space-x-2 mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {tabs.map((tab) => (
        <motion.button 
          key={tab.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id 
              ? 'bg-purple-500 text-white' 
              : 'bg-white text-purple-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default TaskTabs; 