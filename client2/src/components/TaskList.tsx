'use client';

import { motion } from 'framer-motion';
import { Check, Trash2, Calendar } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-lg">No tasks yet</p>
        <p className="text-gray-400 text-sm mt-2">Click the + button to add your first task</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${
            task.completed ? 'border-green-400' : 'border-pink-400'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              onClick={() => onToggleComplete(task._id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-pink-400'
              }`}
            >
              {task.completed && <Check size={16} className="text-white" />}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              )}
              
              {/* Meta info */}
              <div className="flex items-center gap-3 mt-2">
                {task.priority && (
                  <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                )}
                {task.category && (
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {task.category}
                  </span>
                )}
                {task.dueDate && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

