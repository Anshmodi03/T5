"use client";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CoursesIndex = ({ setCursorVariant }) => {
  const location = useLocation();

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<CoursesPage setCursorVariant={setCursorVariant} />}
          />
          <Route
            path="/:courseId"
            element={<CourseDetail setCursorVariant={setCursorVariant} />}
          />
        </Routes>
      </AnimatePresence>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CoursesIndex;
