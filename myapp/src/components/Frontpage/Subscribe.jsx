import React from "react";
import { motion } from "framer-motion";

const Subscribe = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 py-16 text-white flex flex-col items-center text-center px-6">
      <motion.h2
        className="text-4xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📩 Stay Updated with Our Latest Courses!
      </motion.h2>
      <p className="text-lg max-w-2xl mb-6">
        Subscribe to our newsletter and never miss an update. Get exclusive
        offers, new course releases, and more!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg text-gray-800 w-72 outline-none border-2 border-white"
        />
        <motion.button
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          whileHover={{ scale: 1.05 }}
        >
          Subscribe
        </motion.button>
      </div>
    </div>
  );
};

export default Subscribe;
