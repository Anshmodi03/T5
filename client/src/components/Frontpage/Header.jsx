// Header.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showTeachersDropdown, setShowTeachersDropdown] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;
  const coursesDropdownRef = useRef(null);
  const teachersDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Custom animation variants for the account button
  const accountButtonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95 },
  };

  // Handle scroll to change header style and update active section.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

    // Close dropdowns on clicking outside
    const handleClickOutside = (event) => {
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
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsAccountDropdownOpen(false);
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

  // Framer Motion variants for dropdown animations
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

  // Smooth scroll to section on click.
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle logout click: call logout function from auth and navigate to home.
  const handleLogout = async () => {
    await logout();
    setIsAccountDropdownOpen(false);
    navigate("/");
  };

  // Use the user's name if available; fallback to a generic "Account" text.
  const accountDisplay = user && user.name ? user.name : "Account";

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
                <span className="text-2xl font-bold text-black tracking-tight">
                  <img src="/T5-Logo.png" alt="T5" className="h-13 w-auto" />
                </span>
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

          {/* Account Button (Desktop) with hover for dropdown */}
          <div
            className="hidden md:block relative"
            ref={accountDropdownRef}
            onMouseEnter={() => setIsAccountDropdownOpen(true)}
            onMouseLeave={() => setIsAccountDropdownOpen(false)}
          >
            {user ? (
              <>
                <motion.button
                  className="px-4 py-2 border border-white bg-black text-white rounded-md flex items-center gap-2"
                  variants={accountButtonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{accountDisplay}</span>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      isAccountDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>
                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/95 ring-1 ring-white/20 z-50 overflow-hidden"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="py-1">
                        <Link to="/profile">
                          <motion.div
                            variants={itemVariants}
                            className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
                          >
                            Profile
                          </motion.div>
                        </Link>
                        <motion.div
                          variants={itemVariants}
                          className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.button
                className="px-4 py-2 border border-white bg-black text-white rounded-md flex items-center gap-2"
                variants={accountButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate("/auth")}
              >
                <User className="h-4 w-4" />
                Login/Signup
              </motion.button>
            )}
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
            className="fixed top-[60px] inset-x-0 z-40 bg-black/95 overflow-y-auto md:hidden max-h-[calc(100vh-60px)]"
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
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 pb-2 text-white font-medium">
                      Hi, {accountDisplay}
                    </div>
                    <Link to="/profile">
                      <button
                        className="w-full py-2 px-4 bg-black text-white border border-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                    </Link>
                    <button
                      className="w-full py-2 px-4 bg-black text-white border border-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <User className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full py-3 px-4 bg-black text-white border border-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/auth");
                    }}
                  >
                    <User className="h-4 w-4" />
                    Account
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
