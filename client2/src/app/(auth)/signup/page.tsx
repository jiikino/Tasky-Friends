'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Account created successfully!');
        router.push('/choose-pet');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error: any) {
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Floating emojis for signup page
  const signupEmojis = ['🎉', '🌟', '🎊', '🎈', '✨', '🎁', '🌈', '💝', '⭐', '🎨'];

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fecaca] to-[#fbcfe8] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating emojis background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {signupEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40 text-xl"
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              x: [0, Math.sin(i) * 15, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.form 
        onSubmit={handleSignup}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated title */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="text-3xl mb-2"
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏠
          </motion.div>
          <h1 className="text-2xl font-bold text-pink-800">Welcome to the family!</h1>
          <p className="text-pink-600 text-sm mt-1">Let's start your amazing journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <input 
            type="text" 
            placeholder="What should we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <input 
            type="email" 
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <input 
            type="password" 
            placeholder="Create a secret password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
            required
          />
        </motion.div>

        <motion.button 
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-full shadow hover:bg-pink-600 transition-colors duration-200 font-semibold disabled:opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Creating account...' : 'Start My Adventure! 🚀'}
        </motion.button>

        <motion.p 
          className="text-center mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Already part of the family?{' '}
          <Link 
            href="/login"
            className="text-pink-600 hover:underline font-semibold"
          >
            Sign in here
          </Link>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}

