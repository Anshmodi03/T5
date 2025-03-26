"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const courses = [
  {
    title: "JEE Physics",
    description:
      "Master core concepts in Mechanics, Electricity, and Modern Physics to excel in JEE.",
    icon: "⚛️",
    color: "from-blue-500 to-indigo-600",
    features: [
      "Mechanics",
      "Thermodynamics",
      "Modern Physics",
      "Optics",
      "Electromagnetism",
    ],
  },
  {
    title: "JEE Chemistry",
    description:
      "Dive into Organic, Inorganic, and Physical Chemistry for a complete exam preparation.",
    icon: "🧪",
    color: "from-green-500 to-teal-600",
    features: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Chemical Reactions",
      "Periodic Trends",
    ],
  },
  {
    title: "JEE Mathematics",
    description:
      "Cover advanced topics in Calculus, Algebra, and Geometry to build a strong foundation.",
    icon: "📐",
    color: "from-purple-500 to-indigo-600",
    features: [
      "Calculus",
      "Algebra",
      "Geometry",
      "Trigonometry",
      "Probability",
    ],
  },
  {
    title: "JEE Problem Solving Strategies",
    description:
      "Enhance your analytical skills and learn proven strategies to tackle challenging questions.",
    icon: "🧠",
    color: "from-orange-500 to-pink-600",
    features: [
      "Time Management",
      "Question Analysis",
      "Concept Application",
      "Test Simulation",
      "Strategy Optimization",
    ],
  },
  {
    title: "JEE Mock Tests & Analysis",
    description:
      "Simulate real exam conditions with mock tests and detailed performance analysis.",
    icon: "📝",
    color: "from-red-500 to-orange-600",
    features: [
      "Full-Length Tests",
      "Performance Analysis",
      "Weakness Identification",
      "Solution Strategies",
      "Time Optimization",
    ],
  },
  {
    title: "Engineering Entrance Exam Coaching",
    description:
      "A comprehensive course covering Physics, Chemistry, and Mathematics tailored for engineering exams.",
    icon: "⚙️",
    color: "from-cyan-500 to-blue-600",
    features: [
      "Integrated Subject Coaching",
      "Problem-Solving Sessions",
      "Exam Techniques",
      "Previous Year Papers",
      "Interactive Q&A",
    ],
  },
];

const CourseCard = ({ course, index, setCursorVariant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
      className="group"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 hover-lift">
        <div
          className={`bg-gradient-to-r ${course.color} p-6 text-white relative overflow-hidden`}
        >
          <div className="text-4xl mb-2 relative z-10">{course.icon}</div>
          <h3 className="text-xl font-bold relative z-10">{course.title}</h3>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 transform transition-transform duration-500 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6 transform transition-transform duration-500 group-hover:scale-150"></div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              COURSE INCLUDES:
            </h4>
            <ul className="space-y-1">
              {course.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-600"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <motion.button
            className={`w-full py-2 bg-gradient-to-r ${course.color} text-white rounded-md`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = ({ setCursorVariant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="courses" className="py-20 bg-gray-50" ref={ref}>
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
            FEATURED COURSES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text primary-gradient">
            Explore Our Featured Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover comprehensive courses designed to prepare you for the JEE
            and other engineering entrance exams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              index={index}
              setCursorVariant={setCursorVariant}
            />
          ))}
        </div>

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
          <motion.button
            className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-md shadow-sm hover:shadow-md transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            View All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
