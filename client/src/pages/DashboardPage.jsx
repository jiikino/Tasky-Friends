import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../Component/Header';
import CompanionSection from '../../Component/CompanionSection';
import TaskTabs from '../../Component/TaskTabs';
import TaskList from '../../Component/TaskList';
import AddTaskInput from '../../Component/AddTaskInput';
import BottomNavigation from '../../Component/BottomNavigation';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', completed: false, priority: 'high', category: 'Work' },
    { id: 2, title: 'Buy groceries', completed: true, priority: 'medium', category: 'Personal' },
    { id: 3, title: 'Schedule dentist appointment', completed: false, priority: 'medium', category: 'Health' },
    { id: 4, title: 'Water plants', completed: false, priority: 'low', category: 'Home' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { 
        id: tasks.length + 1, 
        title: newTask, 
        completed: false,
        priority: 'medium',
        category: 'Personal'
      }]);
      setNewTask('');
    }
  };
  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !task.completed;
    if (activeTab === 'completed') return task.completed;
    return true;
  });
  
  const completedCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <motion.div 
      className="flex flex-col h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        completedCount={completedCount}
        totalTasks={totalTasks}
        onLogout={handleLogout}
      />
      
      <CompanionSection 
        completedCount={completedCount}
        totalTasks={totalTasks}
      />
      
      <TaskTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <TaskList 
        tasks={filteredTasks}
        onToggle={toggleTask}
      />
      
      <AddTaskInput 
        newTask={newTask}
        setNewTask={setNewTask}
        onAddTask={addTask}
      />
      
      <BottomNavigation />
    </motion.div>
  );
};

export default DashboardPage; 