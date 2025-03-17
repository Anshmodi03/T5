import React from "react";
import { motion } from "framer-motion";

const Teacher = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-400 py-16 text-white flex flex-col items-center text-center px-6">
      <motion.h2
        className="text-4xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📚 Meet Our Expert Instructors!
      </motion.h2>
      <p className="text-lg max-w-2xl mb-6">
        Our teachers are industry leaders, dedicated to providing high-quality
        education and guiding students toward success.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <motion.a
          href="#"
          className="bg-blue-500 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
        >
          Become an Instructor
        </motion.a>
        <motion.a
          href="#"
          className="bg-green-500 px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore Teachers
        </motion.a>
      </div>
    </div>
  );
};

export default Teacher;
