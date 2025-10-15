'use client';

import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Check, Clock, X } from 'lucide-react';
import { toast } from 'react-toastify';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

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

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get tasks for selected date
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  // Handle date click
  const handleDateClick = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    if (dateTasks.length > 0) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
      toast.info('No tasks for this date');
    }
  };

  // Custom tile content to show task indicators
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateTasks = getTasksForDate(date);
      if (dateTasks.length > 0) {
        const completedCount = dateTasks.filter((t) => t.completed).length;
        const activeCount = dateTasks.length - completedCount;

        return (
          <div className="flex gap-0.5 justify-center mt-1">
            {activeCount > 0 && (
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" title={`${activeCount} active`} />
            )}
            {completedCount > 0 && (
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" title={`${completedCount} completed`} />
            )}
          </div>
        );
      }
    }
    return null;
  };

  const priorityColors = {
    low: 'bg-blue-50 border-blue-300 text-blue-700',
    medium: 'bg-yellow-50 border-yellow-300 text-yellow-700',
    high: 'bg-red-50 border-red-300 text-red-700',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-500">Loading calendar...</div>
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
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon size={32} className="text-pink-600" />
          <h1 className="text-4xl font-bold text-gray-800">Calendar</h1>
        </div>
        <p className="text-gray-600">Click on a date with tasks to view details</p>
      </motion.div>

      {/* Full Width Calendar */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <style jsx global>{`
          .react-calendar {
            width: 100% !important;
            border: none !important;
            font-family: inherit;
          }
          
          .react-calendar__tile {
            height: 100px !important;
            font-size: 16px !important;
            padding: 12px !important;
            position: relative;
            border-radius: 8px;
          }
          
          .react-calendar__tile:hover {
            background-color: #fce7f3 !important;
          }
          
          .react-calendar__tile--active {
            background-color: #ec4899 !important;
            color: white !important;
          }
          
          .react-calendar__tile--now {
            background-color: #fbcfe8 !important;
            font-weight: bold;
          }
          
          .react-calendar__month-view__days__day--weekend {
            color: #ec4899;
          }
          
          .react-calendar__navigation button {
            font-size: 18px !important;
            padding: 12px !important;
            border-radius: 8px;
          }
          
          .react-calendar__navigation button:hover {
            background-color: #fce7f3 !important;
          }
          
          .react-calendar__month-view__weekdays {
            font-size: 14px !important;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
          }
          
          .react-calendar__month-view__weekdays__weekday {
            padding: 12px !important;
          }
        `}</style>
        
        <ReactCalendar
          onChange={(value) => handleDateClick(value as Date)}
          value={null}
          tileContent={tileContent}
          className="w-full"
        />
      </motion.div>

      {/* Task Details Modal */}
      <AnimatePresence>
        {selectedDate && selectedDateTasks.length > 0 && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDate(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h2>
                  <p className="text-pink-100 text-sm mt-1">
                    {selectedDateTasks.length} task{selectedDateTasks.length !== 1 ? 's' : ''} scheduled
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-pink-600">
                      {selectedDateTasks.filter((t) => !t.completed).length}
                    </p>
                    <p className="text-sm text-gray-600">Active Tasks</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {selectedDateTasks.filter((t) => t.completed).length}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-4">
                  {selectedDateTasks.map((task) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-5 rounded-xl border-l-4 shadow-sm ${
                        task.completed
                          ? 'bg-green-50 border-green-400'
                          : 'bg-pink-50 border-pink-400'
                      }`}
                    >
                      {/* Task Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          task.completed ? 'bg-green-100' : 'bg-pink-100'
                        }`}>
                          {task.completed ? (
                            <Check size={20} className="text-green-600" />
                          ) : (
                            <Clock size={20} className="text-pink-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-lg font-semibold ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}
                          >
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Task Meta */}
                      <div className="flex flex-wrap gap-2 ml-14">
                        {task.priority && (
                          <span
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                              priorityColors[task.priority]
                            }`}
                          >
                            Priority: {task.priority}
                          </span>
                        )}
                        {task.category && (
                          <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                            {task.category}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
