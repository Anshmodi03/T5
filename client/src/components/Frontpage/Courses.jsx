"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { courses } from "../courses/courseData";

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
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative overflow-hidden`}
        >
          <div className="text-4xl mb-2 relative z-10">
            {course.category === "Web Development"
              ? "💻"
              : course.category === "Data Science"
              ? "🤖"
              : course.category === "UI/UX Design"
              ? "🎨"
              : course.category === "Cybersecurity"
              ? "🔒"
              : course.category === "Engineering"
              ? "📊"
              : "🩺"}
          </div>
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
              {course.curriculum[0].lessons.slice(0, 4).map((feature, idx) => (
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-gray-400 line-through text-sm mr-2">
                {course.price}
              </span>
              <span className="text-blue-600 font-bold text-xl">
                {course.discountedPrice}
              </span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                course.status === "Live"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {course.status}
            </span>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md flex items-center justify-center hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Learn More
          </Link>
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

  // Display only the first 6 courses
  const displayedCourses = courses.slice(0, 6);

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
            Discover high-quality courses designed to help you advance your
            career and achieve your learning goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
            <CourseCard
              key={course.id}
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
          <Link
            to="/courses"
            className="inline-block px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-md shadow-sm hover:shadow-md transition-all"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            View All Courses
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
