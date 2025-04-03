"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { courses, courseCategories, courseLevels } from "./courseData";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  Users,
  Clock,
  BookOpen,
  X,
  Sparkles,
  Bookmark,
  Heart,
} from "lucide-react";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CoursesPage = ({ setCursorVariant }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [wishlistedCourses, setWishlistedCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const levelRef = useRef(null);
  const sortRef = useRef(null);
  const searchRef = useRef(null);

  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    setIsInitialLoad(false);
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setShowLevelDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let result = courses;

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== "All Levels") {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    // Sort courses
    if (sortBy === "popularity") {
      result = [...result].sort(
        (a, b) => b.studentsEnrolled - a.studentsEnrolled
      );
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) =>
          Number.parseFloat(a.discountedPrice.replace("$", "")) -
          Number.parseFloat(b.discountedPrice.replace("$", ""))
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) =>
          Number.parseFloat(b.discountedPrice.replace("$", "")) -
          Number.parseFloat(a.discountedPrice.replace("$", ""))
      );
    }

    setFilteredCourses(result);
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  const toggleWishlist = (courseId) => {
    setWishlistedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleBookmark = (courseId) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { type: "spring", stiffness: 300, damping: 24 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchRef.current.focus();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSortBy("popularity");
    navigate("/courses");
  };

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
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              EXPLORE COURSES
            </motion.span>
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4 gradient-text primary-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Find Your Perfect Course
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Browse our extensive collection of high-quality courses in
              engineering, medical sciences, and school education to help you
              achieve your learning goals.
            </motion.p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search Bar */}
              <div
                className={`relative flex-1 transition-all duration-300 ${
                  isSearchFocused ? "ring-2 ring-blue-500 rounded-md" : ""
                }`}
                ref={searchRef}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isSearchFocused ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  ref={searchRef}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={handleClearSearch}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <div className="md:hidden">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Filters</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                      isFilterVisible ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative" ref={categoryRef}>
                  <button
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 min-w-[180px]"
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{selectedCategory}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                        showCategoryDropdown ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showCategoryDropdown && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                      >
                        {courseCategories.map((category, index) => (
                          <button
                            key={index}
                            className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                              selectedCategory === category
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowCategoryDropdown(false);
                              if (category !== "All Categories") {
                                navigate(`/courses?category=${category}`);
                              } else {
                                navigate("/courses");
                              }
                            }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                          >
                            {category}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Level Filter */}
                <div className="relative" ref={levelRef}>
                  <button
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 min-w-[160px]"
                    onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{selectedLevel}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                        showLevelDropdown ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showLevelDropdown && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                      >
                        {courseLevels.map((level, index) => (
                          <button
                            key={index}
                            className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                              selectedLevel === level
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSelectedLevel(level);
                              setShowLevelDropdown(false);
                            }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                          >
                            {level}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {isFilterVisible && (
                <motion.div
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="md:hidden mt-4 space-y-4 overflow-hidden"
                >
                  {/* Category Filter */}
                  <div className="relative" ref={categoryRef}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700">
                          Category: {selectedCategory}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                          showCategoryDropdown ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {showCategoryDropdown && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                        >
                          {courseCategories.map((category, index) => (
                            <button
                              key={index}
                              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                                selectedCategory === category
                                  ? "bg-blue-50 text-blue-600 font-medium"
                                  : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedCategory(category);
                                setShowCategoryDropdown(false);
                                if (category !== "All Categories") {
                                  navigate(`/courses?category=${category}`);
                                } else {
                                  navigate("/courses");
                                }
                              }}
                              onMouseEnter={() => setCursorVariant("hover")}
                              onMouseLeave={() => setCursorVariant("default")}
                            >
                              {category}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Level Filter */}
                  <div className="relative" ref={levelRef}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
                      onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700">
                          Level: {selectedLevel}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                          showLevelDropdown ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {showLevelDropdown && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                        >
                          {courseLevels.map((level, index) => (
                            <button
                              key={index}
                              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                                selectedLevel === level
                                  ? "bg-blue-50 text-blue-600 font-medium"
                                  : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedLevel(level);
                                setShowLevelDropdown(false);
                              }}
                              onMouseEnter={() => setCursorVariant("hover")}
                              onMouseLeave={() => setCursorVariant("default")}
                            >
                              {level}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sort Options */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </p>

              <div className="relative" ref={sortRef}>
                <button
                  className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span>Sort by: </span>
                  <span className="font-medium ml-1">
                    {sortBy === "popularity" && "Most Popular"}
                    {sortBy === "rating" && "Highest Rated"}
                    {sortBy === "price-low" && "Price: Low to High"}
                    {sortBy === "price-high" && "Price: High to Low"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                      showSortDropdown ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                    >
                      <button
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                          sortBy === "popularity"
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortBy("popularity");
                          setShowSortDropdown(false);
                        }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        Most Popular
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                          sortBy === "rating"
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortBy("rating");
                          setShowSortDropdown(false);
                        }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        Highest Rated
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                          sortBy === "price-low"
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortBy("price-low");
                          setShowSortDropdown(false);
                        }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        Price: Low to High
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                          sortBy === "price-high"
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortBy("price-high");
                          setShowSortDropdown(false);
                        }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        Price: High to Low
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Courses Grid - Updated to use real images */}
          {filteredCourses.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  custom={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover-lift transition-all duration-300 group"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover transition-transform duration-700 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div
                      className={`absolute top-0 right-0 bg-gradient-to-r ${course.gradient} text-white px-3 py-1 m-2 rounded-full text-xs font-bold`}
                    >
                      {course.level}
                    </div>
                    {course.status === "Live" && (
                      <div className="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1 m-2 rounded-full text-xs font-bold flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                        Live
                      </div>
                    )}
                    {course.featured && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 m-2 rounded-full text-xs font-bold flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </div>
                    )}

                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <motion.button
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          wishlistedCourses.includes(course.id)
                            ? "bg-red-100 text-red-500"
                            : "bg-white/80 text-gray-600 hover:text-red-500 hover:bg-red-50"
                        } backdrop-blur-sm transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(course.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlistedCourses.includes(course.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </motion.button>

                      <motion.button
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bookmarkedCourses.includes(course.id)
                            ? "bg-blue-100 text-blue-500"
                            : "bg-white/80 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                        } backdrop-blur-sm transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark(course.id);
                        }}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            bookmarkedCourses.includes(course.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span
                        className={`bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent text-xs px-2 py-1 rounded-full border border-gray-200 font-semibold`}
                      >
                        {course.category}
                      </span>
                      <div className="flex items-center ml-auto">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.batchSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-gray-400 line-through text-sm mr-2">
                          {course.price}
                        </span>
                        <span
                          className={`bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent font-bold text-xl`}
                        >
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
                      className={`block w-full py-2 bg-gradient-to-r ${course.gradient} text-white rounded-md text-center font-medium hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleResetFilters}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CoursesPage;
