'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface CompanionSectionProps {
  pet: string;
  progressPercentage: number;
  userName?: string;
}

export default function CompanionSection({ pet, progressPercentage, userName }: CompanionSectionProps) {
  const petEmojis: { [key: string]: string } = {
    cat: '🐱',
    dog: '🐶',
    bunny: '🐰',
    turtle: '🐢',
  };

  const petNames: { [key: string]: string } = {
    cat: 'Whiskers',
    dog: 'Buddy',
    bunny: 'Fluffy',
    turtle: 'Shelly',
  };

  const selectedPetEmoji = petEmojis[pet] || '🐾';
  const selectedPetName = petNames[pet] || 'Your Pet';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-6 shadow-sm"
    >
      {/* Pet Display */}
      <div className="text-center mb-6">
        <motion.div
          className="text-8xl mb-3"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {selectedPetEmoji}
        </motion.div>
        <h3 className="text-2xl font-bold text-pink-800">{selectedPetName}</h3>
        <p className="text-sm text-pink-600 mt-1">Your Productivity Companion</p>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">Progress Today</span>
          <span className="text-pink-600 font-bold">{progressPercentage}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full relative"
          >
            {progressPercentage > 0 && (
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-white/30"
              />
            )}
          </motion.div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 text-pink-600 mb-1">
            <Heart size={16} className="fill-current" />
            <span className="text-xs font-semibold">Motivation</span>
          </div>
          <p className="text-sm text-gray-700">
            {progressPercentage === 0 && "Let's get started! Your companion is cheering for you! 🎉"}
            {progressPercentage > 0 && progressPercentage < 50 && "Great start! Keep going! 💪"}
            {progressPercentage >= 50 && progressPercentage < 100 && "You're doing amazing! Almost there! ⭐"}
            {progressPercentage === 100 && "Perfect! You completed all your tasks! 🎊"}
          </p>
        </div>

        {/* Stats */}
        {userName && (
          <div className="mt-4 pt-4 border-t border-pink-200">
            <p className="text-xs text-gray-600 text-center">
              Keep it up, <span className="font-semibold text-pink-700">{userName}</span>! ✨
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

