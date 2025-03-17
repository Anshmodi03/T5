import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a variety of courses in web development, data science, AI, cybersecurity, UI/UX design, and more!",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by signing up on our platform, selecting a course, and completing the registration process.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes! Our courses are designed to be self-paced so you can learn at your convenience.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, we provide certificates upon successful completion of the course.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-5 p-0  text-gray-900 flex flex-col items-center">
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        ❓ Frequently Asked Questions ❓
      </motion.h2>
      <div className="max-w-3xl w-full">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer border border-gray-300"
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {openIndex === index ? "➖" : "➕"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
