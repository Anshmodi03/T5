"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0,
        }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center">
            <img src="/T5.png" alt="Logo" className="h-8 w-auto" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
