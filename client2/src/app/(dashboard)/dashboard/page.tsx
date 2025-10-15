'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskTabs from '@/components/TaskTabs';
import TaskList from '@/components/TaskList';
import AddTaskButton from '@/components/AddTaskButton';
import CompanionSection from '@/components/CompanionSection';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

interface UserData {
  name: string;
  email: string;
  pet: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/data', {
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        setUserData({
          name: data.userData.name,
          email: data.userData.email,
          pet: data.userData.pet || 'cat',
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks || []);
      } else {
        toast.error('Failed to load tasks');
      }
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ completed: !task.completed }),
      });

      const data = await response.json();
      
      if (data.success) {
        setTasks(
          tasks.map((t) =>
            t._id === taskId ? { ...t, completed: !t.completed } : t
          )
        );
        toast.success(task.completed ? 'Task marked as active' : 'Task completed! 🎉');
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      
      if (data.success) {
        setTasks(tasks.filter((t) => t._id !== taskId));
        toast.success('Task deleted');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'active') return !task.completed;
    if (activeTab === 'completed') return task.completed;
    return true; // 'all'
  });

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  // Calculate progress percentage
  const progressPercentage = tasks.length > 0
    ? Math.round((taskCounts.completed / tasks.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back{userData?.name ? `, ${userData.name}` : ''}! 👋
        </h1>
        <p className="text-gray-600">Let's get things done today</p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks (2/3 width on large screens) */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Task Tabs */}
            <TaskTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={taskCounts}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </div>
        </motion.div>

        {/* Right Column - Companion (1/3 width on large screens) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CompanionSection
            pet={userData?.pet || 'cat'}
            progressPercentage={progressPercentage}
            userName={userData?.name}
          />
        </motion.div>
      </div>

      {/* Floating Add Task Button */}
      <AddTaskButton onTaskAdded={fetchTasks} />
    </div>
  );
}
