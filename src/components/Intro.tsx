import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Intro() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <Brain className="w-32 h-32 text-purple-500 mx-auto mb-4" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
        >
          ZaBaDeV 2024
        </motion.h1>
      </motion.div>
    </div>
  );
}