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
  ChevronsDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../auth/AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showTeachersDropdown, setShowTeachersDropdown] = useState(false);

  // New state variables for authentication modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [userRole, setUserRole] = useState("student");

  const location = useLocation();
  const pathname = location.pathname;
  const dropdownRef = useRef(null);
  const coursesDropdownRef = useRef(null);
  const teachersDropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Handle scroll and update the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Determine the active section using section IDs
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.pageYOffset + 100;
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

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (
        coursesDropdownRef.current &&
        !coursesDropdownRef.current.contains(event.target)
      ) {
        setShowCoursesDropdown(false);
      }
      if (
        teachersDropdownRef.current &&
        !teachersDropdownRef.current.contains(event.target)
      ) {
        setShowTeachersDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", link: "/", dropdown: null },
    {
      name: "Courses",
      link: "/courses",
      dropdown: [
        "All Courses",
        "Engineering",
        "Computer Science",
        "Data Science",
        "Artificial Intelligence",
      ],
    },
    {
      name: "Teacher",
      link: "#teachers",
      dropdown: ["Our Faculty", "Become an Instructor", "Teaching Methodology"],
    },
    { name: "Testimonials", link: "#testimonials", dropdown: null },
    { name: "FAQ", link: "#faq", dropdown: null },
  ];

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // New function to open the authentication modal
  const openAuthModal = (type, role) => {
    setAuthType(type);
    setUserRole(role);
    setShowAuthModal(true);
    setShowUserDropdown(false);
  };

  // Variants for dropdown animations using Framer Motion
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

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          scrolled
            ? "bg-gradient-to-r from-black/95 to-black/85 shadow-lg backdrop-blur-sm"
            : "bg-gradient-to-r from-black/70 to-black/60 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <div className="h-12 w-auto bg-white rounded-md py-2 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
                {/* This white container will make your black logo stand out */}
                <span className="text-2xl font-bold text-black tracking-tight">
                  <img src="/T5-Logo.png" alt="T5" className="h-13 w-auto" />
                </span>
                {/* Replace the text above with your logo: */}
              </div>
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
                    : item.name === "Teacher"
                    ? teachersDropdownRef
                    : null
                }
                onMouseEnter={() => {
                  if (item.name === "Courses") setShowCoursesDropdown(true);
                  if (item.name === "Teacher") setShowTeachersDropdown(true);
                }}
                onMouseLeave={() => {
                  if (item.name === "Courses") setShowCoursesDropdown(false);
                  if (item.name === "Teacher") setShowTeachersDropdown(false);
                }}
              >
                {item.name === "Courses" ? (
                  <>
                    <Link to="/courses">
                      <div
                        className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                          pathname.includes("/courses")
                            ? "bg-white text-black"
                            : "text-white hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="relative">Courses</span>
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                            showCoursesDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </Link>

                    <AnimatePresence>
                      {showCoursesDropdown && (
                        <motion.div
                          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-black/95 ring-1 ring-white/20 z-50 overflow-hidden"
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
                                >
                                  <div className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer">
                                    {subItem}
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.name === "Teacher" ? (
                  <>
                    <button
                      onClick={() => scrollToSection("teachers")}
                      className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 flex items-center ${
                        activeSection === "teachers"
                          ? "bg-white text-black"
                          : "text-white hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="relative">Teacher</span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          showTeachersDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {showTeachersDropdown && (
                        <motion.div
                          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-black/95 ring-1 ring-white/20 z-50 overflow-hidden"
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
                                  className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                                  onClick={() => setShowTeachersDropdown(false)}
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
                  <Link to={item.link}>
                    <div
                      className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 cursor-pointer ${
                        (item.link === "/" &&
                          pathname === "/" &&
                          activeSection === "hero") ||
                        (item.link.startsWith("#") &&
                          activeSection === item.link.substring(1))
                          ? "bg-white text-black"
                          : "text-white hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="relative">
                        {item.name}
                        {((item.link === "/" &&
                          pathname === "/" &&
                          activeSection === "hero") ||
                          (item.link.startsWith("#") &&
                            activeSection === item.link.substring(1))) && (
                          <motion.span
                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                            layoutId="underline"
                          />
                        )}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Authentication Button / Account Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <motion.button
              className="px-4 py-2 border border-white text-black bg-white rounded-md hover:shadow-lg transition-all flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
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

            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      onClick={() => openAuthModal("login", "student")}
                    >
                      <BookOpen className="h-4 w-4" />
                      Continue as Student
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 border-t border-gray-100"
                      onClick={() => openAuthModal("login", "teacher")}
                    >
                      <LogOut className="h-4 w-4" />
                      Continue as Teacher
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white p-2 rounded-md focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] inset-x-0 z-40 bg-black/95 overflow-hidden md:hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-white font-medium">
                        <span>{item.name}</span>
                      </div>
                      <div className="pl-4 space-y-2 border-l border-white/20">
                        {item.dropdown.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block text-white/80 hover:text-white transition-colors py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.link}>
                      <div
                        className="block text-white font-medium py-1 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="w-full py-3 px-4 bg-white text-black rounded-md font-medium flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            authType={authType}
            userRole={userRole}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
