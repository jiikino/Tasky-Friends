import React from 'react';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const navItems = [
    { id: 'tasks', icon: '📋', label: 'Tasks', active: true },
    { id: 'calendar', icon: '📅', label: 'Calendar', active: false },
    { id: 'rewards', icon: '🏆', label: 'Rewards', active: false },
    { id: 'settings', icon: '⚙️', label: 'Settings', active: false }
  ];

  return (
    <motion.div 
      className="flex justify-around items-center pt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {navItems.map((item) => (
        <motion.button 
          key={item.id}
          className={`flex flex-col items-center ${item.active ? 'text-purple-800' : 'text-gray-400'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`w-10 h-10 ${item.active ? 'bg-purple-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
            <span>{item.icon}</span>
          </div>
          <span className="text-xs mt-1 font-comic">{item.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default BottomNavigation; 