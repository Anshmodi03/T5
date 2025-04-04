"use client";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Frontpage/Header";
import Hero from "./components/Frontpage/Hero";
import Courses from "./components/Frontpage/Courses";
import Teachers from "./components/Frontpage/Teacher";
import Achievements from "./components/Frontpage/Acheivement";
import Testimonials from "./components/Frontpage/Testimonial";
import FAQ from "./components/Frontpage/FAQ";
import Subscribe from "./components/Frontpage/Subscribe";
import Footer from "./components/Frontpage/Footer";
import Chatbot from "./components/Frontpage/Chatbot";
import CustomCursor from "./components/Frontpage/CustomCursor";
import Loader from "./components/Frontpage/Loader";
import ScrollToTop from "./components/Frontpage/ScrollToTop";
import CoursesIndex from "./components/courses/index";
import CoursesPage from "./components/courses/CoursesPage";
import CourseDetail from "./components/courses/CourseDetail";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Handle cursor variants for interactive elements
  const cursorEnter = () => setCursorVariant("hover");
  const cursorLeave = () => setCursorVariant("default");
  const cursorClick = () => {
    setCursorVariant("click");
    setTimeout(() => setCursorVariant("default"), 300);
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document
          .querySelector(this.getAttribute("href"))
          ?.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Add cursor event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", cursorEnter);
      el.addEventListener("mouseleave", cursorLeave);
      el.addEventListener("mousedown", cursorClick);
    });

    return () => {
      clearTimeout(timer);
      // Cleanup smooth scrolling event listeners
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelector(this.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" });
        });
      });
      // Cleanup cursor event listeners
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", cursorEnter);
        el.removeEventListener("mouseleave", cursorLeave);
        el.removeEventListener("mousedown", cursorClick);
      });
    };
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="app-container"
          >
            <CustomCursor cursorVariant={cursorVariant} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header setCursorVariant={setCursorVariant} />
                    <Hero setCursorVariant={setCursorVariant} />
                    <Courses setCursorVariant={setCursorVariant} />
                    <Teachers setCursorVariant={setCursorVariant} />
                    <Achievements setCursorVariant={setCursorVariant} />
                    <Testimonials setCursorVariant={setCursorVariant} />
                    <FAQ setCursorVariant={setCursorVariant} />
                    <Subscribe setCursorVariant={setCursorVariant} />
                    <Footer setCursorVariant={setCursorVariant} />
                  </>
                }
              />
              {/* Courses routes */}
              <Route
                path="/courses"
                element={<CoursesPage setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/courses/:courseId"
                element={<CourseDetail setCursorVariant={setCursorVariant} />}
              />
              {/* If needed, you can still include the CoursesIndex route */}
              <Route
                path="/courses/*"
                element={<CoursesIndex setCursorVariant={setCursorVariant} />}
              />
            </Routes>
            <Chatbot setCursorVariant={setCursorVariant} />
            <ScrollToTop setCursorVariant={setCursorVariant} />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
