import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-purple-100">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-4xl font-bold text-purple-800 mb-4 tracking-wide">
            Coming Soon!
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            TaskyFriends Dashboard is under construction. 
            We're working hard to bring you an amazing task management experience!
          </p>
          <div className="space-y-4">
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-purple-600 text-sm">75% Complete</p>
            <button
              onClick={handleLogout}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 