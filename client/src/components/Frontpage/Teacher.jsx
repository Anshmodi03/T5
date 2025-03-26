"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const teachers = [
  {
    name: "Dr. Akash Pandey",
    subject: "Physics",
    image: "/teacher1.png",
    description: "Expert in Physics with 10+ years of teaching experience",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
    },
  },
  {
    name: "Prof. Vishal Kumar",
    subject: "Maths",
    image: "/teacher2.png",
    description: "Specializes in Maths with 5+ years of teaching experience",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
    },
  },
  {
    name: "Dr. Rahul Sharma",
    subject: "Mathematics",
    image: "/teacher3.png",
    description: "Makes complex mathematical concepts easy to understand",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
    },
  },
  {
    name: "Dr. Priya Singh",
    subject: "Chemistry",
    image: "/teacher4.png",
    description: "Renowned for her innovative teaching methods",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
    },
  },
];

const TeacherCard = ({ teacher, index, setCursorVariant }) => {
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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover-lift">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-center space-x-3 mb-3">
                <a
                  href={teacher.social.twitter}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href={teacher.social.linkedin}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href={teacher.social.youtube}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </div>
              <motion.button
                className="w-full py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Profile
              </motion.button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold">{teacher.name}</h3>
          <p className="text-blue-600 font-medium mb-2">{teacher.subject}</p>
          <p className="text-gray-600">{teacher.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Teachers = ({ setCursorVariant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="teachers"
      className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
      ref={ref}
    >
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
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            EXPERT INSTRUCTORS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text secondary-gradient">
            Learn from Expert Instructors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our teachers are industry leaders, dedicated to providing
            high-quality education and guiding students toward success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={index}
              teacher={teacher}
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
              transition: { duration: 0.6, delay: 0.4 },
            },
          }}
          className="mt-12 text-center"
        >
          <motion.button
            className="mx-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-md"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Become an Instructor
          </motion.button>
          <motion.button
            className="mx-2 px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Explore All Teachers
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Teachers;
