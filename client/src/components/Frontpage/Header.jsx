// Header.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// Desktop Account Section (remains unchanged for desktop)
const AccountSection = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAccountDropdownOpen(false);
    navigate("/");
  };

  const accountDisplay = user && user.name ? user.name : "Account";
  const userEmail = user && user.email ? user.email : "";

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
      transition: { type: "spring", stiffness: 500, damping: 15 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 500, damping: 17 },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 400, damping: 22 },
    },
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: {
      scale: 1.5,
      opacity: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Non-authenticated view remains a simple redirect to /auth.
  if (!user) {
    return (
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onClick={() => navigate("/auth")}
        className="relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/20 hover:border-white/40 shadow-lg transition-all duration-300 group overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden z-10"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <User className="w-5 h-5 text-white" />
        </motion.div>
        <span className="font-medium text-white group-hover:text-white transition-colors text-sm z-10">
          Account
        </span>
        <motion.div
          animate={{ rotate: 0, y: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="z-10"
        >
          <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white" />
        </motion.div>
      </motion.button>
    );
  }

  // Authenticated view (opens on hover)
  return (
    <div
      className="relative ml-4"
      ref={accountDropdownRef}
      onMouseEnter={() => setIsAccountDropdownOpen(true)}
      onMouseLeave={() => setIsAccountDropdownOpen(false)}
    >
      {/* Enhanced Account Button */}
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className="relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black border border-white/20 hover:border-white/40 shadow-lg transition-all duration-300 group overflow-hidden"
        aria-expanded={isAccountDropdownOpen}
        aria-haspopup="true"
      >
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden z-10"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <User className="w-5 h-5 text-white" />
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <span className="font-medium text-white group-hover:text-white transition-colors text-sm z-10">
          {accountDisplay}
        </span>
        <motion.div
          animate={{
            rotate: isAccountDropdownOpen ? 180 : 0,
            y: isAccountDropdownOpen ? 2 : 0,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="z-10"
        >
          <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white" />
        </motion.div>
        {user && (
          <motion.span
            className="absolute top-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-black/80"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
              boxShadow: [
                "0 0 0px rgba(255, 255, 255, 0.2)",
                "0 0 10px rgba(255, 255, 255, 0.4)",
                "0 0 0px rgba(255, 255, 255, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
        )}
      </motion.button>

      {/* Enhanced Dropdown Menu */}
      <AnimatePresence>
        {isAccountDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-3 w-72 rounded-xl bg-black backdrop-blur-lg border border-white/20 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.5)] overflow-hidden z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-labelledby="accountButton"
          >
            {/* Enhanced User Profile Section */}
            {user && (
              <motion.div
                className="p-5 border-b border-white/10 bg-white/5"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-8 h-8 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.div>
                  <div>
                    <motion.p
                      className="font-semibold text-white text-lg"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {accountDisplay}
                    </motion.p>
                    {userEmail && (
                      <motion.p
                        className="text-xs text-white/60 mt-0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {userEmail}
                      </motion.p>
                    )}
                    {user && (
                      <motion.div
                        className="mt-2 flex items-center gap-1 bg-white/10 text-white/80 text-xs py-1 px-2 rounded-full w-fit"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <Shield size={10} />
                        <span>Verified Account</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced Menu Items */}
            <div className="py-2">
              {/* Profile Link */}
              <motion.div variants={itemVariants} className="relative">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:bg-white/5 transition-colors group relative overflow-hidden"
                  onClick={() => setIsAccountDropdownOpen(false)}
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <User className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-white transition-colors">
                      Profile
                    </span>
                    <span className="text-xs text-white/50 mt-0.5">
                      View and edit your profile
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"
                    initial="initial"
                    whileHover="animate"
                    variants={rippleVariants}
                  />
                </Link>
              </motion.div>

              {/* Settings Link */}
              <motion.div variants={itemVariants} className="relative">
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:bg-white/5 transition-colors group relative overflow-hidden"
                  onClick={() => setIsAccountDropdownOpen(false)}
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Settings className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-white transition-colors">
                      Settings
                    </span>
                    <span className="text-xs text-white/50 mt-0.5">
                      Manage your preferences
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"
                    initial="initial"
                    whileHover="animate"
                    variants={rippleVariants}
                  />
                </Link>
              </motion.div>

              {/* Dashboard Link */}
              <motion.div variants={itemVariants} className="relative">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-white hover:bg-white/5 transition-colors group relative overflow-hidden"
                  onClick={() => setIsAccountDropdownOpen(false)}
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <LayoutDashboard className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-white transition-colors">
                      Dashboard
                    </span>
                    <span className="text-xs text-white/50 mt-0.5">
                      View your analytics
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"
                    initial="initial"
                    whileHover="animate"
                    variants={rippleVariants}
                  />
                </Link>
              </motion.div>

              {/* Logout Button */}
              <motion.div variants={itemVariants} className="px-4 py-3 mt-1">
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors rounded-lg border border-white/10 bg-white/5 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <LogOut className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </motion.div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Logout</span>
                    <span className="text-xs text-white/50 mt-0.5">
                      End your session
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Account Section for Navigation (click to expand dropdown)
const MobileAccountSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accountDisplay = user && user.name ? user.name : "Account";
  const userEmail = user && user.email ? user.email : "";

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="mb-4">
      <div
        className="p-5 bg-black/80 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-lg">{accountDisplay}</p>
          {userEmail && <p className="text-xs text-white/60">{userEmail}</p>}
        </div>
        <div>
          <ChevronDown
            className={`h-5 w-5 text-white transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 bg-black/80 rounded-lg overflow-hidden"
          >
            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
              <div className="px-5 py-3 text-white hover:bg-gray-800">
                Profile
              </div>
            </Link>
            <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>
              <div className="px-5 py-3 text-white hover:bg-gray-800">
                Settings
              </div>
            </Link>
            <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>
              <div className="px-5 py-3 text-white hover:bg-gray-800">
                Dashboard
              </div>
            </Link>
            <div
              className="px-5 py-3 text-white hover:bg-gray-800 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showTeachersDropdown, setShowTeachersDropdown] = useState(false);
  // New state for mobile nav dropdown toggles
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

  const location = useLocation();
  const pathname = location.pathname;
  const coursesDropdownRef = useRef(null);
  const teachersDropdownRef = useRef(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Update header style on scroll and update the active section.
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
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items (unchanged)
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

  // Framer Motion variants for dropdown animations in desktop nav
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
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  // Smooth scroll to section on click.
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle dropdown in mobile nav based on nav item name.
  const toggleMobileDropdown = (name) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-3 ${
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

          {/* Desktop Account Section */}
          <div className="hidden md:block">
            <AccountSection />
          </div>

          {/* Mobile Menu Button */}
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
              {/* Mobile Account Section with Dropdown Items */}
              {user ? (
                <MobileAccountSection />
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

              {/* Mobile Navigation Items with Click-to-Toggle Dropdowns */}
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="flex justify-between items-center text-white font-medium cursor-pointer"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            mobileDropdownOpen[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {mobileDropdownOpen[item.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 space-y-2"
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={
                                  item.name === "Courses"
                                    ? subItem === "All Courses"
                                      ? "/courses"
                                      : `/courses?category=${subItem}`
                                    : "#"
                                }
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="block text-white/80 hover:text-white transition-colors py-1">
                                  {subItem}
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white font-medium py-1 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
