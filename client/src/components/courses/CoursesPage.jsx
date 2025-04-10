import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  Clock,
  Users,
  BarChart4,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  courses,
  courseCategories,
  courseLevels,
  gradientStyles,
} from "./courseData";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation Controls
  const controls = useAnimation();
  const containerRef = useRef(null);
  const containerRefs = useRef([]);
  const containerInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Track hovered card
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Handle filtering courses based on search query, category, and level
  useEffect(() => {
    let filtered = [...courses];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by level
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Trigger animation when container is in view
  useEffect(() => {
    if (containerInView) {
      controls.start("visible");
    }
  }, [containerInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.5,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-black pt-16 pb-20">
        {/* Page header */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl mt-4 font-bold mb-4 text-black">
              Explore Our Courses
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of courses designed to help you master new
              skills, advance your career, and explore your interests.
            </p>
          </motion.div>

          {/* Search and filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-md"
          >
            {/* Search input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-md py-2 pl-10 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm"
              />
            </div>

            {/* Category filter */}
            <div className="relative min-w-[180px]">
              <button
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setLevelDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors shadow-sm text-gray-800"
              >
                <span>{selectedCategory}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform text-gray-500 ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {categoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 max-h-60 overflow-auto"
                  >
                    {courseCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-800 ${
                          selectedCategory === category
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Level filter */}
            <div className="relative min-w-[180px]">
              <button
                onClick={() => {
                  setLevelDropdownOpen(!levelDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors shadow-sm text-gray-800"
              >
                <span>{selectedLevel}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform text-gray-500 ${
                    levelDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {levelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1"
                  >
                    {courseLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedLevel(level);
                          setLevelDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-800 ${
                          selectedLevel === level
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Course count and filter info */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredCourses.length} courses
              {selectedCategory !== "All Categories" &&
                ` in ${selectedCategory}`}
              {selectedLevel !== "All Levels" && ` for ${selectedLevel} level`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-gray-600">Filters Applied</span>
            </div>
          </div>

          {/* Featured courses section (conditionally rendered) */}
          {filteredCourses.some((course) => course.featured) && (
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Sparkles className="h-5 w-5 text-black mr-2" />
                <h2 className="text-2xl font-bold text-black">
                  Featured Courses
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses
                  .filter((course) => course.featured)
                  .map((course, index) => (
                    <motion.div
                      key={course.id}
                      ref={(el) =>
                        (containerRefs.current[`featured_${index}`] = el)
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                      className="group relative h-full"
                      onMouseEnter={() => handleMouseEnter(`featured_${index}`)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-xl">
                        <div
                          className={`bg-gradient-to-r ${
                            course.gradient ||
                            gradientStyles[index % gradientStyles.length]
                          } p-6 relative overflow-hidden`}
                        >
                          {/* Animated background elements */}
                          <motion.div
                            className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"
                            animate={
                              hoveredIndex === `featured_${index}`
                                ? { scale: 1.5, x: -5, y: 5 }
                                : { scale: 1, x: 0, y: 0 }
                            }
                            transition={{ duration: 0.5 }}
                          />

                          <motion.div
                            className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6"
                            animate={
                              hoveredIndex === `featured_${index}`
                                ? { scale: 1.5, x: 5, y: -5 }
                                : { scale: 1, x: 0, y: 0 }
                            }
                            transition={{ duration: 0.5 }}
                          />

                          {/* Course icon with animations */}
                          <motion.div
                            className="text-4xl mb-2 relative z-10"
                            animate={
                              hoveredIndex === `featured_${index}`
                                ? {
                                    y: [0, -8, 0],
                                    transition: {
                                      duration: 1,
                                      times: [0, 0.5, 1],
                                      repeat: 0,
                                    },
                                  }
                                : {}
                            }
                          >
                            <span className="drop-shadow-glow">
                              {course.icon || "⭐"}
                            </span>
                          </motion.div>

                          {/* Course title with gradual reveal */}
                          <h3 className="text-xl font-bold text-white relative z-10">
                            {course.title}
                          </h3>

                          {/* Category and level tags */}
                          <div className="flex mt-2 gap-2 relative z-10">
                            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                              {course.category}
                            </span>
                            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                              {course.level}
                            </span>
                          </div>

                          {course.featured && (
                            <div className="absolute top-4 right-4 bg-white text-black text-xs px-2 py-1 rounded-full font-medium flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <p className="text-gray-600 mb-4 text-sm">
                            {course.description}
                          </p>

                          {/* Course features with animated list items */}
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                              Course Includes:
                            </h4>
                            <ul className="space-y-1">
                              {(
                                (course.curriculum &&
                                  course.curriculum[0]?.lessons) || [
                                  "Advanced Techniques",
                                  "Project Implementation",
                                  "Industry Best Practices",
                                  "Expert Tips",
                                ]
                              )
                                .slice(0, 4)
                                .map((lesson, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="flex items-center text-sm text-gray-600"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      transition: { delay: 0.3 + idx * 0.1 },
                                    }}
                                  >
                                    <motion.svg
                                      className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      initial={{ scale: 0 }}
                                      animate={{
                                        scale: 1,
                                        transition: {
                                          type: "spring",
                                          stiffness: 300,
                                          delay: 0.4 + idx * 0.1,
                                        },
                                      }}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </motion.svg>
                                    <span className="truncate">
                                      {typeof lesson === "string"
                                        ? lesson
                                        : `Lesson ${idx + 1}`}
                                    </span>
                                  </motion.li>
                                ))}
                            </ul>
                          </div>

                          {/* Price and ratings section */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                              <span className="text-gray-400 line-through text-xs">
                                {course.price}
                              </span>
                              <motion.span
                                className="text-black font-bold text-xl"
                                animate={
                                  hoveredIndex === `featured_${index}`
                                    ? {
                                        scale: [1, 1.1, 1],
                                        transition: { duration: 0.5 },
                                      }
                                    : {}
                                }
                              >
                                {course.discountedPrice}
                              </motion.span>
                            </div>

                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-gray-700 font-medium">
                                {course.rating}
                              </span>
                              <span className="text-gray-500 ml-1">
                                (
                                {course.studentsEnrolled?.toLocaleString() ||
                                  "2,500+"}
                                )
                              </span>
                            </div>
                          </div>

                          {/* Learn More button with hover effects */}
                          <Link
                            to={`/courses/${course.id}`}
                            className="relative overflow-hidden group-hover:bg-opacity-90 block"
                          >
                            <motion.div
                              className="w-full py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-md flex items-center justify-center font-medium"
                              whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 },
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="mr-2">Learn More</span>
                              <motion.span
                                animate={
                                  hoveredIndex === `featured_${index}`
                                    ? { x: [0, 5, 0] }
                                    : { x: 0 }
                                }
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatDelay: 0.5,
                                }}
                              >
                                →
                              </motion.span>
                            </motion.div>

                            {/* Bottom border animation on hover */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-[2px] bg-gray-800"
                              initial={{ width: "0%" }}
                              animate={
                                hoveredIndex === `featured_${index}`
                                  ? { width: "100%" }
                                  : { width: "0%" }
                              }
                              transition={{ duration: 0.3 }}
                            />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* All courses section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Courses</h2>

            {filteredCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any courses matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedLevel("All Levels");
                  }}
                  className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    ref={(el) => (containerRefs.current[index] = el)}
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.03,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                    className="group relative h-full"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-xl">
                      <div
                        className={`bg-gradient-to-r ${
                          course.gradient ||
                          gradientStyles[index % gradientStyles.length]
                        } p-6 relative overflow-hidden`}
                      >
                        {/* Animated background elements */}
                        <motion.div
                          className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"
                          animate={
                            hoveredIndex === index
                              ? { scale: 1.5, x: -5, y: 5 }
                              : { scale: 1, x: 0, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        />

                        <motion.div
                          className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6"
                          animate={
                            hoveredIndex === index
                              ? { scale: 1.5, x: 5, y: -5 }
                              : { scale: 1, x: 0, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        />

                        {/* Course icon with animations */}
                        <motion.div
                          className="text-4xl mb-2 relative z-10"
                          animate={
                            hoveredIndex === index
                              ? {
                                  y: [0, -8, 0],
                                  transition: {
                                    duration: 1,
                                    times: [0, 0.5, 1],
                                    repeat: 0,
                                  },
                                }
                              : {}
                          }
                        >
                          <span className="drop-shadow-glow">
                            {course.icon || "📚"}
                          </span>
                        </motion.div>

                        {/* Course title with gradual reveal */}
                        <h3 className="text-xl font-bold text-white relative z-10">
                          {course.title}
                        </h3>

                        {/* Category and level tags */}
                        <div className="flex mt-2 gap-2 relative z-10">
                          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {course.category}
                          </span>
                          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {course.level}
                          </span>
                        </div>

                        {course.featured && (
                          <div className="absolute top-4 right-4 bg-white text-black text-xs px-2 py-1 rounded-full font-medium flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <p className="text-gray-600 mb-4 text-sm">
                          {course.description}
                        </p>

                        {/* Course features with animated list items */}
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                            Course Includes:
                          </h4>
                          <ul className="space-y-1">
                            {(course.curriculum &&
                              course.curriculum[0]?.lessons) ||
                              [
                                "Advanced Techniques",
                                "Project Implementation",
                                "Industry Best Practices",
                                "Expert Tips",
                              ].map((lesson, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-center text-sm text-gray-600"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.3 + idx * 0.1 },
                                  }}
                                >
                                  <motion.svg
                                    className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    initial={{ scale: 0 }}
                                    animate={{
                                      scale: 1,
                                      transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        delay: 0.4 + idx * 0.1,
                                      },
                                    }}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </motion.svg>
                                  <span className="truncate">
                                    {typeof lesson === "string"
                                      ? lesson
                                      : `Lesson ${idx + 1}`}
                                  </span>
                                </motion.li>
                              ))}
                          </ul>
                        </div>

                        {/* Price and ratings section */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex flex-col">
                            <span className="text-gray-400 line-through text-xs">
                              {course.price}
                            </span>
                            <motion.span
                              className="text-black font-bold text-xl"
                              animate={
                                hoveredIndex === index
                                  ? {
                                      scale: [1, 1.1, 1],
                                      transition: { duration: 0.5 },
                                    }
                                  : {}
                              }
                            >
                              {course.discountedPrice}
                            </motion.span>
                          </div>

                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-gray-700">
                              {course.rating}
                            </span>
                            <span className="text-gray-500 ml-1">
                              (
                              {course.studentsEnrolled?.toLocaleString() ||
                                "2,500+"}
                              )
                            </span>
                          </div>
                        </div>

                        {/* Learn More button with hover effects */}
                        <Link
                          to={`/courses/${course.id}`}
                          className="relative overflow-hidden group-hover:bg-opacity-90 block"
                        >
                          <motion.div
                            className="w-full py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-md flex items-center justify-center font-medium"
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="mr-2">Learn More</span>
                            <motion.span
                              animate={
                                hoveredIndex === index
                                  ? { x: [0, 5, 0] }
                                  : { x: 0 }
                              }
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                              }}
                            >
                              →
                            </motion.span>
                          </motion.div>

                          {/* Bottom border animation on hover */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-gray-800"
                            initial={{ width: "0%" }}
                            animate={
                              hoveredIndex === index
                                ? { width: "100%" }
                                : { width: "0%" }
                            }
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;
