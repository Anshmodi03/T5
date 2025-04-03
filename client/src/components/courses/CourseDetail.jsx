"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "./courseData";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  Calendar,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Play,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  AlertCircle,
  ShoppingCart,
  Gift,
  Sparkles,
} from "lucide-react";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CourseDetail = ({ setCursorVariant }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = courses.find((c) => c.id === courseId);
      setCourse(foundCourse);
      setLoading(false);

      // Initialize expanded state for curriculum modules
      if (foundCourse && foundCourse.curriculum) {
        const initialExpandedState = {};
        foundCourse.curriculum.forEach((module, index) => {
          initialExpandedState[index] = index === 0; // Only expand the first module by default
        });
        setExpandedModules(initialExpandedState);
      }

      // Find related courses (same category)
      if (foundCourse) {
        const related = courses
          .filter(
            (c) => c.id !== courseId && c.category === foundCourse.category
          )
          .slice(0, 3);
        setRelatedCourses(related);
      }

      // Scroll to top when course changes
      window.scrollTo(0, 0);
    }, 500);
  }, [courseId]);

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEnrollNow = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  if (loading) {
    return (
      <>
        <Header setCursorVariant={setCursorVariant} />
        <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
        <Footer setCursorVariant={setCursorVariant} />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header setCursorVariant={setCursorVariant} />
        <motion.div
          className="min-h-screen pt-20 pb-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-md">
            <div className="text-red-500 mb-4">
              <AlertCircle className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/courses")}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Courses
            </motion.button>
          </div>
        </motion.div>
        <Footer setCursorVariant={setCursorVariant} />
      </>
    );
  }

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <motion.div
        className="min-h-screen bg-gray-50 pt-20 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-md shadow-lg flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>Course added to your cart successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Header */}
        <div className={`bg-gradient-to-r ${course.gradient} text-white py-12`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/courses"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center mb-2 flex-wrap gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    {course.featured && (
                      <span className="bg-yellow-400/80 text-white text-xs px-3 py-1 rounded-full flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {course.title}
                  </motion.h1>
                  <motion.p
                    className="text-white/80 max-w-2xl mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {course.description}
                  </motion.p>

                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{course.rating}</span>
                      <span className="ml-1 text-white/70">
                        ({course.studentsEnrolled.toLocaleString()} students)
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Clock className="h-5 w-5 text-white/70 mr-1" />
                      <span>{course.duration}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Calendar className="h-5 w-5 text-white/70 mr-1" />
                      <span>{course.validity}</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <img
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                    <div className="ml-2">
                      <p className="font-medium">
                        Instructor: {course.instructor.name}
                      </p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">
                          {course.instructor.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 md:mt-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <span className="text-white/70 line-through text-lg">
                        {course.price}
                      </span>
                      <span className="text-white text-3xl font-bold ml-2">
                        {course.discountedPrice}
                      </span>
                      <span className="ml-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full">
                        {Math.round(
                          (1 -
                            Number(course.discountedPrice.replace("$", "")) /
                              Number(course.price.replace("$", ""))) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                    <motion.button
                      className="w-full py-3 px-6 bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-white rounded-md font-bold text-lg mb-3 hover:bg-opacity-90 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      onClick={handleEnrollNow}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Enroll Now
                      </span>
                    </motion.button>
                    <p className="text-white/70 text-sm">
                      30-Day Money-Back Guarantee
                    </p>

                    <div className="flex justify-between mt-4 pt-4 border-t border-white/20">
                      <motion.button
                        className={`flex items-center text-white/80 hover:text-white transition-colors ${
                          isWishlisted ? "text-red-300" : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <Heart
                          className={`h-5 w-5 mr-1 ${
                            isWishlisted ? "fill-current" : ""
                          }`}
                        />
                        Wishlist
                      </motion.button>

                      <motion.button
                        className={`flex items-center text-white/80 hover:text-white transition-colors ${
                          isBookmarked ? "text-yellow-300" : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <Bookmark
                          className={`h-5 w-5 mr-1 ${
                            isBookmarked ? "fill-current" : ""
                          }`}
                        />
                        Save
                      </motion.button>

                      <div className="relative">
                        <motion.button
                          className="flex items-center text-white/80 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowShareOptions(!showShareOptions)}
                          onMouseEnter={() => setCursorVariant("hover")}
                          onMouseLeave={() => setCursorVariant("default")}
                        >
                          <Share2 className="h-5 w-5 mr-1" />
                          Share
                        </motion.button>

                        <AnimatePresence>
                          {showShareOptions && (
                            <motion.div
                              className="absolute right-0 bottom-full mb-2 bg-white rounded-md shadow-lg p-2 w-36"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-600"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-400"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Twitter
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Gift className="h-6 w-6 text-yellow-300 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Gift this course</p>
                      <p className="text-sm text-white/70">
                        Perfect for friends & colleagues
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Course Image */}
              <motion.div
                className="bg-white rounded-xl shadow-md mb-8 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              </motion.div>

              {/* Tabs */}
              <motion.div
                className="bg-white rounded-xl shadow-md mb-8 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex overflow-x-auto scrollbar-hide">
                  <button
                    className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === "overview"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("overview")}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === "curriculum"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("curriculum")}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Curriculum
                  </button>
                  <button
                    className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === "instructor"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("instructor")}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Instructor
                  </button>
                  <button
                    className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === "reviews"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Reviews
                  </button>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          About This Course
                        </h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {course.longDescription}
                        </p>

                        <h3 className="text-xl font-bold mb-3">
                          What You'll Learn
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                          {course.curriculum
                            .flatMap((module) => module.lessons)
                            .slice(0, 8)
                            .map((lesson, index) => (
                              <div key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{lesson}</span>
                              </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                          Course Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                          {course.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "curriculum" && (
                      <motion.div
                        key="curriculum"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          Course Curriculum
                        </h2>
                        <p className="text-gray-700 mb-6">
                          This course includes {course.curriculum.length}{" "}
                          modules with{" "}
                          {course.curriculum.reduce(
                            (total, module) => total + module.lessons.length,
                            0
                          )}{" "}
                          lessons.
                        </p>

                        <div className="space-y-4">
                          {course.curriculum.map((module, moduleIndex) => (
                            <motion.div
                              key={moduleIndex}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: moduleIndex * 0.1,
                                duration: 0.5,
                              }}
                            >
                              <button
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                onClick={() => toggleModule(moduleIndex)}
                                onMouseEnter={() => setCursorVariant("hover")}
                                onMouseLeave={() => setCursorVariant("default")}
                              >
                                <div className="flex items-center">
                                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                                  <span className="font-medium">
                                    {module.title}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-500 mr-2">
                                    {module.lessons.length} lessons
                                  </span>
                                  {expandedModules[moduleIndex] ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                              </button>

                              <AnimatePresence>
                                {expandedModules[moduleIndex] && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="border-t border-gray-200">
                                      {module.lessons.map(
                                        (lesson, lessonIndex) => (
                                          <motion.div
                                            key={lessonIndex}
                                            className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              delay: lessonIndex * 0.05,
                                              duration: 0.3,
                                            }}
                                          >
                                            <Play className="h-4 w-4 text-gray-400 mr-3" />
                                            <span className="text-gray-700">
                                              {lesson}
                                            </span>
                                          </motion.div>
                                        )
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "instructor" && (
                      <motion.div
                        key="instructor"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          Meet Your Instructor
                        </h2>

                        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                          <motion.img
                            src={course.instructor.image}
                            alt={course.instructor.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                          />

                          <div>
                            <h3 className="text-xl font-bold mb-1">
                              {course.instructor.name}
                            </h3>
                            <div className="flex items-center mb-3">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 font-medium">
                                {course.instructor.rating} Instructor Rating
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">
                              {course.instructor.bio}
                            </p>

                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              <span>
                                {course.studentsEnrolled.toLocaleString()}{" "}
                                Students
                              </span>
                              <span className="mx-2">•</span>
                              <Award className="h-4 w-4 mr-1" />
                              <span>{course.curriculum.length} Courses</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <h3 className="text-lg font-bold mb-3">
                            Instructor's Expertise
                          </h3>
                          <p className="text-gray-700 mb-4">
                            With years of experience in teaching and industry
                            practice, {course.instructor.name} brings real-world
                            knowledge and practical insights to this course.
                            Their teaching methodology focuses on hands-on
                            learning and practical applications to ensure
                            students gain valuable skills they can apply
                            immediately.
                          </p>
                          <motion.button
                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Full Profile
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "reviews" && (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        variants={containerVariants}
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          Student Reviews
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-gray-50 rounded-lg">
                          <div className="text-center md:text-left mb-4 md:mb-0">
                            <div className="text-5xl font-bold text-blue-600">
                              {course.rating}
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.floor(course.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Course Rating
                            </div>
                          </div>

                          <div className="w-full md:w-2/3">
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((rating) => {
                                // Simulate rating distribution
                                const percentage =
                                  rating === 5
                                    ? 70
                                    : rating === 4
                                    ? 20
                                    : rating === 3
                                    ? 7
                                    : rating === 2
                                    ? 2
                                    : 1;
                                return (
                                  <motion.div
                                    key={rating}
                                    className="flex items-center"
                                    variants={itemVariants}
                                  >
                                    <div className="flex items-center w-20">
                                      <span className="text-sm font-medium mr-2">
                                        {rating}
                                      </span>
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                                      <motion.div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{
                                          duration: 0.8,
                                          delay: 0.2,
                                        }}
                                      ></motion.div>
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2 w-12">
                                      {percentage}%
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {course.testimonials.map((testimonial, index) => (
                            <motion.div
                              key={index}
                              className="border-b border-gray-200 pb-6 last:border-b-0"
                              variants={itemVariants}
                            >
                              <div className="flex items-start">
                                <img
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                  <h4 className="font-bold">
                                    {testimonial.name}
                                  </h4>
                                  <div className="flex items-center mt-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(testimonial.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">
                                      1 month ago
                                    </span>
                                  </div>
                                  <p className="text-gray-700">
                                    {testimonial.text}
                                  </p>

                                  <div className="flex items-center mt-3 text-sm">
                                    <button className="text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      Reply
                                    </button>
                                    <span className="mx-2 text-gray-300">
                                      |
                                    </span>
                                    <button className="text-gray-500 hover:text-blue-600 transition-colors">
                                      Helpful
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <motion.button
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View All Reviews
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Related Courses */}
              {relatedCourses.length > 0 && (
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4">Related Courses</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedCourses.map((relatedCourse, index) => (
                      <motion.div
                        key={relatedCourse.id}
                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                        whileHover={{ y: -5 }}
                        variants={itemVariants}
                      >
                        <img
                          src={relatedCourse.image || "/placeholder.svg"}
                          alt={relatedCourse.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-bold text-sm mb-1 line-clamp-1">
                            {relatedCourse.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="ml-1">{relatedCourse.rating}</span>
                            <span className="mx-1">•</span>
                            <span>
                              {relatedCourse.studentsEnrolled} students
                            </span>
                          </div>
                          <Link
                            to={`/courses/${relatedCourse.id}`}
                            className={`text-transparent bg-clip-text bg-gradient-to-r ${relatedCourse.gradient} text-sm font-medium hover:opacity-80 transition-colors`}
                          >
                            View Course
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <motion.div
                className="bg-white rounded-xl shadow-md p-6 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4">Course Information</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Duration</h4>
                      <p className="text-gray-600">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Batch Size</h4>
                      <p className="text-gray-600">{course.batchSize}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Access</h4>
                      <p className="text-gray-600">{course.validity}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Lessons</h4>
                      <p className="text-gray-600">
                        {course.curriculum.reduce(
                          (total, module) => total + module.lessons.length,
                          0
                        )}{" "}
                        lessons in {course.curriculum.length} modules
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    This course includes:
                  </h3>
                  <ul className="space-y-2">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-3">
                  <motion.button
                    className={`w-full py-3 px-6 bg-gradient-to-r ${course.gradient} text-white rounded-md font-bold text-lg hover:shadow-lg transition-colors flex items-center justify-center`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    onClick={handleEnrollNow}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Enroll Now
                  </motion.button>

                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Syllabus
                    </motion.button>

                    <motion.button
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CourseDetail;
