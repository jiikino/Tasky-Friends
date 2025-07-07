import React, { useState } from 'react';
// import axios from 'axios'; // TODO: Uncomment when backend is ready
import { useNavigate } from 'react-router-dom';

// axios.defaults.withCredentials = true; // TODO: Uncomment when backend is ready

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // TODO: Uncomment when backend is ready
    /*
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        navigate('/dashboard');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
    */
    
    // TEMPORARY: For frontend testing only
    if (email && password) {
      navigate('/dashboard');
    } else {
      setMessage("Please fill in all fields");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6">
      <form 
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Login to TaskyFriends 🐱</h1>

        {message && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        <button 
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-full shadow hover:bg-purple-600 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/signup')}
            className="text-purple-600 hover:underline"
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage; 