"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, BookOpen, ChevronDown } from "lucide-react";
import T5Logo from "../../assets/T5.png";

const Header = ({ setCursorVariant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
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

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "#home",
      dropdown: null,
    },
    {
      name: "Courses",
      link: "#courses",
      dropdown: ["Engineering", "Medical", "Computer Science", "Design"],
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

  return (
    <header
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
          <img src={T5Logo} alt="T5 Logo" className="w-15 h-15 rounded-sm" />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a
                href={item.link}
                className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 ${
                  activeSection === item.link.substring(1)
                    ? `${scrolled ? "text-black" : "text-white"} bg-teal-400`
                    : `${
                        scrolled ? "text-black" : "text-white"
                      } hover:text-teal-400 hover:bg-teal-50/50`
                }`}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <span className="relative">
                  {item.name}
                  {activeSection === item.link.substring(1) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                      layoutId="underline"
                    />
                  )}
                </span>
                {item.dropdown && (
                  <ChevronDown className="inline-block ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </a>

              {item.dropdown && (
                <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="py-1 bg-white rounded-md ring-1 ring-black ring-opacity-5">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400 transition-colors"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Account Dropdown */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-teal-400 to-indigo-400 text-white rounded-md hover:shadow-lg transition-all flex items-center gap-2"
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

          <AnimatePresence>
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              >
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Login as
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Student
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Teacher
                  </a>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        Sign up as
                      </p>
                    </div>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Student
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-400"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Teacher
                    </a>
                  </div>
                </div>
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
                  <a
                    href={item.link}
                    className={`block py-3 px-4 rounded-md text-lg font-medium ${
                      activeSection === item.link.substring(1)
                        ? "text-white bg-teal-400"
                        : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>

                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block py-2 px-4 text-gray-400 hover:text-teal-400 rounded-md hover:bg-teal-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 space-y-4">
                <div className="px-4 py-2">
                  <p className="text-lg font-medium text-gray-900">Login as</p>
                </div>
                <a
                  href="#"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Student
                </a>
                <a
                  href="#"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Teacher
                </a>

                <div className="px-4 py-2 mt-4">
                  <p className="text-lg font-medium text-gray-900">
                    Sign up as
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Student
                </a>
                <a
                  href="#"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-teal-400 rounded-md hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Teacher
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
