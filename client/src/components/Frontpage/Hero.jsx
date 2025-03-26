import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/hero1.png?height=600&width=1200",
    title: "Learn from the Best Educators",
    description:
      "Join our platform for high-quality education from industry experts",
    buttonText: "Get Started",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    image: "/hero2.png?height=600&width=1200",
    title: "Prepare for Competitive Exams",
    description: "Comprehensive courses for JEE, NEET, CAT and more",
    buttonText: "Explore Courses",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    image: "/hero3.png?height=600&width=1200",
    title: "Interactive Learning Experience",
    description: "Engage with our interactive content and live sessions",
    buttonText: "Join Now",
    color: "from-teal-600 to-green-600",
  },
];

const Hero = ({ setCursorVariant }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const slideInterval = useRef(null);

  const startAutoplay = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay();
    }

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isAutoplay]);

  const handleSlideChange = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-black/45"
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(50%)" }} // Darken the image
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {slides[currentSlide].description}
              </p>
              <motion.button
                className={`px-8 py-3 bg-gradient-to-r ${slides[currentSlide].color} text-white rounded-md hover:shadow-xl transition-all`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {slides[currentSlide].buttonText}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white z-10"
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </motion.button>

      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white z-10"
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </motion.button>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-1"
        >
          <motion.div
            animate={{ height: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
