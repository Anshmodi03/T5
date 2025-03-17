import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alice Johnson",
    country: "USA",
    quote:
      "This platform transformed my career! The courses are top-notch and easy to follow.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Ravi Kumar",
    country: "India",
    quote:
      "Learning here has been an amazing experience. The instructors are very knowledgeable!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sophia Lee",
    country: "Canada",
    quote:
      "I gained real-world skills that helped me land my dream job. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className=" bg-gradient-to-r from-purple-500 to-blue-600 py-20 text-white flex flex-col items-center">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🎓 What Our Students Say 🎓
      </motion.h2>
      <p className="text-lg text-center max-w-2xl mb-8">
        Join thousands of students who have transformed their careers with us!
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center transform hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <p className="italic">"{testimonial.quote}"</p>
            <h4 className="mt-4 font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.country}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
