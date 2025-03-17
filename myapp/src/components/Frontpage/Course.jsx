import React from "react";
import { motion } from "framer-motion";

export const Course = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-400 py-16 min-h-screen py-16 px-6 flex justify-center items-center">
      <motion.div
        className="max-w-7xl w-full bg-white p-10 rounded-lg shadow-2xl border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          🌟 Explore Our Featured Courses 🌟
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Course 1 */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-xl font-semibold">
              🚀 Full Stack Web Development
            </h3>
            <p className="mt-2 text-gray-600">
              Master front-end and back-end development with hands-on projects.
            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Learn More
            </a>
          </motion.div>

          {/* Course 2 */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-xl font-semibold">🤖 Data Science & AI</h3>
            <p className="mt-2 text-gray-600">
              Explore machine learning, Python, and AI-driven solutions.
            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Learn More
            </a>
          </motion.div>

          {/* Course 3 */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-xl font-semibold">🎨 UI/UX Design</h3>
            <p className="mt-2 text-gray-600">
              Learn design principles, prototyping, and user experience
              strategies.
            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Learn More
            </a>
          </motion.div>

          {/* Course 4 */}
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-xl font-semibold">
              🔒 Cybersecurity Fundamentals
            </h3>
            <p className="mt-2 text-gray-600">
              Understand security principles and protect digital assets.
            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
