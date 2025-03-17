import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Enrolled", value: "50,000+", icon: "📚" },
  { label: "Satisfaction Rate", value: "98%", icon: "😊" },
  { label: "Certified Tutors", value: "500+", icon: "🎓" },
];

const Acheivement = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 flex flex-col items-center text-center">
      <motion.h2
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📊 Our Achievements 📊
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-64 text-center transform hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-lg text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Acheivement;
