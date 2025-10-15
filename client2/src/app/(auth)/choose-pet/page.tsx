'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ChoosePetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const pickPet = async (pet: string) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/user/choose-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ pet }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`${pet} chosen! 🎉`);
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Failed to choose pet');
      }
    } catch (error: any) {
      toast.error('Failed to choose pet');
    } finally {
      setLoading(false);
    }
  };

  // Staggered animation for pet buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const petVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Cute floating emojis
  const floatingEmojis = ['⭐', '🌸', '🌈', '🎀', '🌟', '🌼', '🎈', '✨', '🌹', '🌺'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fce7f3] to-[#fbcfe8] p-6"
    >
      {/* Floating cute emojis background */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/50 text-2xl"
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              x: [0, Math.sin(i) * 20, 0],
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
      </motion.div>

      {/* Title section with paw emoji on top */}
      <motion.div 
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <motion.div
          className="text-4xl mb-2"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🐾
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold text-pink-800"
          whileHover={{ scale: 1.05 }}
        >
          Pick your buddy
        </motion.h1>
      </motion.div>

      {/* Pet selection grid with staggered animations */}
      <motion.div 
        className="grid grid-cols-2 gap-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          onClick={() => !loading && pickPet("cat")}
          disabled={loading}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden disabled:opacity-50"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐱
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => !loading && pickPet("bunny")}
          disabled={loading}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden disabled:opacity-50"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: -5,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐰
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => !loading && pickPet("dog")}
          disabled={loading}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden disabled:opacity-50"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐶
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => !loading && pickPet("turtle")}
          disabled={loading}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden disabled:opacity-50"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: -5,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐢
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Cute instruction text */}
      <motion.p
        className="text-pink-600 mt-8 text-center max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {loading ? 'Choosing your buddy...' : 'Click on your favorite buddy to start your adventure! ✨'}
      </motion.p>
    </motion.div>
  );
}

