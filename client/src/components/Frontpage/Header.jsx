"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  BookOpen,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import T5Logo from "../../assets/T5.png";
import AuthModal from "../auth/AuthModal";
import { logout } from "../auth/authService";

const Header = ({ setCursorVariant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [userRole, setUserRole] = useState("student");
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showTeachersDropdown, setShowTeachersDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [textColorClass, setTextColorClass] = useState("text-white");

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const coursesDropdownRef = useRef(null);
  const teachersDropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Dynamic text color based on background
  useEffect(() => {
    const updateTextColor = () => {
      if (scrolled) {
        setTextColorClass("text-gray-800");
      } else {
        // Check if we're at the hero section
        if (location.pathname === "/" && activeSection === "home") {
          setTextColorClass("text-white");
        } else {
          setTextColorClass("text-gray-800");
        }
      }
    };

    updateTextColor();
  }, [scrolled, location.pathname, activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.pageYOffset + 100;

      // Always set home as active when at the top of the page
      if (window.pageYOffset < 100 && location.pathname === "/") {
        setActiveSection("home");
        return;
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initial call to set active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    {
      name: "Home",
      link: "/",
      dropdown: null,
    },
    {
      name: "Courses",
      link: "/courses",
      dropdown: [
        "All Courses",
        "Engineering",
        "Medical",
        "Computer Science",
        "Design",
      ],
    },
    {
      name: "Teachers",
      link: "#teachers",
      dropdown: ["Our Faculty", "Become a Teacher", "Teaching Philosophy"],
    },
    {
      name: "Testimonials",
      link: "#testimonials",
      dropdown: null,
    },
    {
      name: "FAQ",
      link: "#faq",
      dropdown: null,
    },
  ];

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const openAuthModal = (type, role) => {
    setAuthType(type);
    setUserRole(role);
    setShowAuthModal(true);
    setShowUserDropdown(false);
  };

  // Logout handler: call logout API then clear local data regardless of API result.
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear client-side authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      setShowUserDropdown(false);
      navigate("/");
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.2 },
    },
  };

  // Enhanced text gradient class with a subtler effect
  const getTextGradientClass = () => {
    if (scrolled) {
      // When scrolled, use a darker indigo-blue-teal gradient
      return "bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 bg-clip-text text-transparent font-medium";
    } else {
      return location.pathname === "/" && activeSection === "home"
        ? // On home page when not scrolled, use a lighter version of the gradient
          "bg-gradient-to-r from-indigo-300 via-blue-300 to-teal-300 bg-clip-text text-transparent font-medium"
        : // Otherwise, default to the darker gradient
          "bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 bg-clip-text text-transparent font-medium";
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white/95 backdrop-blur-md shadow-md"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Link to="/">
              <img
                src={T5Logo || "/placeholder.svg"}
                alt="T5 Logo"
                className="w-15 h-15 rounded-sm"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                ref={
                  item.name === "Courses"
                    ? coursesDropdownRef
                    : item.name === "Teachers"
                    ? teachersDropdownRef
                    : null
                }
                onMouseEnter={() => {
                  if (item.name === "Courses") setShowCoursesDropdown(true);
                  if (item.name === "Teachers") setShowTeachersDropdown(true);
                }}
                onMouseLeave={() => {
                  if (item.name === "Courses") setShowCoursesDropdown(false);
                  if (item.name === "Teachers") setShowTeachersDropdown(false);
                }}
              >
                {item.name === "Courses" ? (
                  <>
                    <Link
                      to="/courses"
                      className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 flex items-center ${
                        location.pathname.includes("/courses")
                          ? "bg-teal-400 text-white font-bold"
                          : `hover:text-teal-400 hover:bg-teal-50/50 ${
                              scrolled
                                ? "text-gray-800 font-semibold"
                                : `${textColorClass} font-semibold`
                            }`
                      }`}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <span
                        className={`relative ${
                          location.pathname.includes("/courses")
                            ? ""
                            : getTextGradientClass()
                        }`}
                      >
                        Courses
                      </span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          showCoursesDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {showCoursesDropdown && (
                        <motion.div
                          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="py-1">
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.div
                                key={subIndex}
                                variants={itemVariants}
                              >
                                <Link
                                  to={
                                    subItem === "All Courses"
                                      ? "/courses"
                                      : `/courses?category=${subItem}`
                                  }
                                  className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors font-medium"
                                  onClick={() => setShowCoursesDropdown(false)}
                                  onMouseEnter={() => setCursorVariant("hover")}
                                  onMouseLeave={() =>
                                    setCursorVariant("default")
                                  }
                                >
                                  {subItem}
                                  <ChevronRight className="h-4 w-4 opacity-70" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.name === "Teachers" ? (
                  <>
                    <Link
                      to={item.link}
                      className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 flex items-center ${
                        activeSection === item.link.substring(1)
                          ? "bg-teal-400 text-white font-bold"
                          : `hover:text-teal-400 hover:bg-teal-50/50 ${
                              scrolled
                                ? "text-gray-800 font-semibold"
                                : `${textColorClass} font-semibold`
                            }`
                      }`}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <span
                        className={`relative ${
                          activeSection === item.link.substring(1)
                            ? ""
                            : getTextGradientClass()
                        }`}
                      >
                        Teachers
                      </span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          showTeachersDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {showTeachersDropdown && (
                        <motion.div
                          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="py-1">
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.div
                                key={subIndex}
                                variants={itemVariants}
                              >
                                <a
                                  href="#"
                                  className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors font-medium"
                                  onClick={() => setShowTeachersDropdown(false)}
                                  onMouseEnter={() => setCursorVariant("hover")}
                                  onMouseLeave={() =>
                                    setCursorVariant("default")
                                  }
                                >
                                  {subItem}
                                  <ChevronRight className="h-4 w-4 opacity-70" />
                                </a>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.link}
                    className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 ${
                      (item.link === "/" &&
                        location.pathname === "/" &&
                        activeSection === "home") ||
                      (item.link !== "/" &&
                        activeSection === item.link.substring(1))
                        ? "bg-teal-400 text-white font-bold"
                        : `hover:text-teal-400 hover:bg-teal-50/50 ${
                            scrolled
                              ? "text-gray-800 font-semibold"
                              : `${textColorClass} font-semibold`
                          }`
                    }`}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span
                      className={`relative ${
                        (item.link === "/" &&
                          location.pathname === "/" &&
                          activeSection === "home") ||
                        (item.link !== "/" &&
                          activeSection === item.link.substring(1))
                          ? ""
                          : getTextGradientClass()
                      }`}
                    >
                      {item.name}
                      {((item.link === "/" &&
                        location.pathname === "/" &&
                        activeSection === "home") ||
                        (item.link !== "/" &&
                          activeSection === item.link.substring(1))) && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                          layoutId="underline"
                        />
                      )}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User Account Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-indigo-400 text-white rounded-md hover:shadow-lg transition-all flex items-center gap-2 font-bold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={toggleUserDropdown}
              >
                <User className="h-4 w-4" />
                {user?.name || "User"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showUserDropdown ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            ) : (
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-indigo-400 text-white rounded-md hover:shadow-lg transition-all flex items-center gap-2 font-bold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={toggleUserDropdown}
              >
                <User className="h-4 w-4" />
                Account
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showUserDropdown ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            )}

            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  {isLoggedIn ? (
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || ""}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 font-medium"
                        onClick={() => setShowUserDropdown(false)}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        to="/my-courses"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 font-medium"
                        onClick={() => setShowUserDropdown(false)}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        My Courses
                      </Link>
                      {/* Logout button */}
                      <button
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 font-medium"
                        onClick={handleLogout}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Continue as
                        </p>
                      </div>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 font-medium"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        onClick={() => openAuthModal("login", "student")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Student
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 font-medium"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        onClick={() => openAuthModal("login", "teacher")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Teacher
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white z-40 pt-20 px-4 md:hidden overflow-y-auto"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.name === "Courses" ? (
                      <>
                        <Link
                          to="/courses"
                          className={`block py-3 px-4 rounded-md text-lg font-bold ${
                            location.pathname.includes("/courses")
                              ? "text-white bg-teal-400"
                              : "text-gray-700"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={
                                subItem === "All Courses"
                                  ? "/courses"
                                  : `/courses?category=${subItem}`
                              }
                              className="block py-2 px-4 text-gray-500 hover:text-teal-500 rounded-md hover:bg-teal-50 transition-colors font-medium"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to={item.link}
                          className={`block py-3 px-4 rounded-md text-lg font-bold ${
                            (item.link === "/" &&
                              location.pathname === "/" &&
                              activeSection === "home") ||
                            (item.link !== "/" &&
                              activeSection === item.link.substring(1))
                              ? "text-white bg-teal-400"
                              : "text-gray-700"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.dropdown && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.dropdown.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href="#"
                                className="block py-2 px-4 text-gray-500 hover:text-teal-500 rounded-md hover:bg-teal-50 transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <div className="mt-6 space-y-4">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-lg font-bold text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user?.email || ""}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        to="/my-courses"
                        className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        My Courses
                      </Link>
                      <button
                        className="flex items-center w-full text-left py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50 font-medium"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-lg font-bold text-gray-900">
                          Continue as
                        </p>
                      </div>
                      <a
                        href="#"
                        className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50 font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                          openAuthModal("login", "student");
                        }}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Student
                      </a>
                      <a
                        href="#"
                        className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50 font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                          openAuthModal("login", "teacher");
                        }}
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        Teacher
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            authType={authType}
            userRole={userRole}
            onClose={() => setShowAuthModal(false)}
            onSwitchAuthType={(type) => setAuthType(type)}
            setCursorVariant={setCursorVariant}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
