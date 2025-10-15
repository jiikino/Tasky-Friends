import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { motion } from 'framer-motion';

const ChoosePetPage = () => {
  const navigate = useNavigate();

  const pickPet = async (pet) => {
    console.log(`Pet selected: ${pet}`);

    // This is where you would call your backend to save the pet:
    /*
    try {
      await axios.put('/api/users/set-pet', { pet });
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to set pet", err);
    }
    */

    // For now, just simulate and go to dashboard
    navigate('/dashboard');
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
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6"
    >
      {/* Floating cute emojis background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300 text-2xl"
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
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <motion.div
          className="text-4xl mb-2"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          🐾
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold text-purple-800"
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
          onClick={() => pickPet("cat")}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🐱
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => pickPet("bunny")}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden"
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
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🐰
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => pickPet("dog")}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -3, 0],
              transition: {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🐶
          </motion.span>
        </motion.button>

        <motion.button 
          onClick={() => pickPet("turtle")}
          className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-5xl relative overflow-hidden"
          variants={petVariants}
          whileHover={{ 
            scale: 1.15, 
            rotate: -5,
            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.span
            animate={{ 
              y: [0, -2, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🐢
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Cute instruction text */}
      <motion.p
        className="text-purple-600 mt-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        Click on your favorite buddy to start your adventure! ✨
      </motion.p>
    </motion.div>
  );
};

export default ChoosePetPage; 