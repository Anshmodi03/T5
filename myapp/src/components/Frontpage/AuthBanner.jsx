import React from "react";
import { motion } from "framer-motion";

const AuthBanner = () => {
  return (
    <div className=" h-5 bg-gradient-to-r from-indigo-500 to-purple-600 py-16 text-white flex flex-col items-end text-center px-6">
      <div className="flex flex-wrap justify-center gap-4">
        <motion.a
          href="#"
          className="bg-blue-500 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.a>
        <motion.a
          href="#"
          className="bg-green-500 px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
        >
          Sign Up
        </motion.a>
        <motion.a
          href="#"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          whileHover={{ scale: 1.05 }}
        >
          Register
        </motion.a>
      </div>
    </div>
  );
};

export default AuthBanner;
