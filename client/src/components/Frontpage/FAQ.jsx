"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";

const faqs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a variety of courses in web development, data science, AI, cybersecurity, UI/UX design, engineering, medical sciences, and more! Our curriculum is constantly updated to reflect the latest industry trends and technologies.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by signing up on our platform, selecting a course, and completing the registration process. Payment can be made through various methods including credit/debit cards and digital wallets. We also offer installment options for premium courses.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes! Our courses are designed to be self-paced so you can learn at your convenience. However, some courses may have live sessions or scheduled assignments to enhance the learning experience and provide real-time interaction with instructors.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, we provide certificates upon successful completion of the course. These certificates are recognized by industry partners and can be shared on your professional profiles. Some of our advanced courses also offer industry-recognized certifications.",
  },
  {
    question: "Can I access the course materials after completion?",
    answer:
      "Yes, once you've enrolled in a course, you'll have lifetime access to the course materials, allowing you to revisit concepts whenever needed. We also provide regular updates to course content to ensure it remains relevant.",
  },
  {
    question: "Do you offer any scholarships or financial aid?",
    answer:
      "We offer scholarships and financial aid to eligible students. Please contact our support team for more information on the application process. We're committed to making quality education accessible to everyone regardless of financial constraints.",
  },
];

const FAQ = ({ setCursorVariant }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text primary-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform and courses
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 },
              }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.6 },
            },
          }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow-md"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
